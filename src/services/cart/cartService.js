
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getUserCart = async (userId) => {
    return await prisma.cart.findUnique({
        where: { userId },
        include: {
            items: {
                include: {
                    product: {
                        include:{
                            stock:true,
                        }
                    },
                },
            },
        },
    });
};

exports.addToCart = async (userId,  quantity = 1, productId, total) => {

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

    return await prisma.cartItem.create({
        data: {
            cartId: cart.id,
            quantity: quantity,
            productId: productId,
            total: total
        },
        include: {
             cart: true,
            product: true
        }
    });
};


exports.updateCartItem = async (itemId, quantity, productId, total) => {
    return await prisma.cartItem.update({
        where: { id: itemId },
        data: {
            quantity: quantity,
            productId: productId,
            total: total

        },
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
