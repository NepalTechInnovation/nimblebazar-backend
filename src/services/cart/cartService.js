
const { PrismaClient } = require('@prisma/client');
const ApiError = require('../../utils/ApiError');
const prisma = new PrismaClient();

exports.getUserCart = async (userId) => {
    return await prisma.cart.findUnique({
        where: { userId },
        include: {
            items: {
                include: {
                    product: {
                        include: {
                            stock: true,
                        }
                    },
                    attributes: {
                        include: {
                            productAttributeValue: true
                        }
                    }
                },
            },
        },
    });
};

exports.addToCart = async (userId, quantity = 1, productId, total, attributeIds) => {

    let cart = await prisma.cart.findUnique({ where: { userId } });

    if (!cart) {
        cart = await prisma.cart.create({ data: { userId } });
    }
    const existingItem = await prisma.cartItem.findFirst({
        where: {
            cartId: cart.id,
            productId: productId,

        },
    });
    if (existingItem) {
        return await prisma.cartItem.update({
            where: { id: existingItem.id, },
            data: {
                quantity: existingItem.quantity + quantity,
                total: total

            },
            include: {
                product: true
            }
        });
    }
    const validAttrs = await prisma.productAttributeValue.findMany({
        where: {
            id: { in: attributeIds },
            productId: productId,
        },
        select: { id: true },
    });
    if (validAttrs.length !== attributeIds.length) {
        throw new ApiError(500, 'One or more attributes are invalid for this product');
    }
    return await prisma.cartItem.create({
        data: {
            cartId: cart.id,
            quantity: quantity,
            productId: productId,
            total: total,
            attributes: {
                create: attributeIds.map(id => ({ productAttributeValueId: id })),
            },
        },
        include: {
            cart: true,
            product: true,
            attributes: {
                include: {
                    productAttributeValue: true
                }
            }
        }
    });
};


exports.updateCartItem = async (itemId, quantity, productId, total, attributeIds) => {
    const cartItem = await prisma.cartItem.findUnique({
        where: { id: itemId },
        include: { product: true },
    });

    if (!cartItem) {
        throw new ApiError(500, 'Cart item not found');
    }

    const validAttrs = await prisma.productAttributeValue.findMany({
        where: {
            id: { in: attributeIds },
            productId: cartItem.productId,
        },
        select: { id: true },
    });
    if (validAttrs.length !== attributeIds.length) {
        throw new ApiError(500, 'Duplicate attribute IDs are not allowed');
    }
    await prisma.$transaction(async (tx) => {

        await tx.cartItemAttribute.deleteMany({
            where: { cartItemId: itemId },
        }),
            await tx.cartItem.update({
                where: { id: itemId },
                data: {
                    quantity: quantity,
                    productId: productId,
                    total: total,
                    attributes: {
                        create: attributeIds.map(id => ({ productAttributeValueId: id })),
                    },

                },
            })

    });
};

exports.removeCartItem = async (itemId) => {
    return await prisma.cartItem.delete({
        where: { id: itemId },
    });
};

exports.clearCart = async (userId) => {
    const cart = await prisma.cart.findUnique({
        where: { userId: userId },
    });

    if (!cart) return;
    await prisma.$transaction(async (tx) => {
        await tx.cartItem.deleteMany({
            where: { cartId: cart.id },
        });

        await tx.cart.deleteMany({
            where: { userId: userId },
        });
    });
};
