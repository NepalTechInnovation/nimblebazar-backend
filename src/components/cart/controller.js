// model Cart {
//     id String @id @default(cuid())

//     userId String @unique
//     user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

//     items CartItem[]

//     @@map("carts")
//   }

const db = require("../../config/db");

const getCartByUserId = async (req, res) => {
    const {
        userId
    } = req.body;

    try {
        const cart = await db.cart.upsert({
            where: { userId },
            update: {},
            create: { userId }
        });

        res.status(201).json({
            success: true,
            message: "Cart found",
            data: cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to find cart"
        });
    }
};

const updateCart = async (req, res) => {
    const {
        id,
        userId,
        items = []
    } = req.body;

    try {
        const cart = await db.cart.update({
            where: { id },
            data: {
                userId
            }
        });

        // Step 1: Get all existing items for the cart
        const existingItems = await db.cartItem.findMany({
            where: { cartId: id },
        });

        // Step 2: Extract IDs from the incoming items (those with id)
        const incomingCartItemIds = items
            .filter(item => item.id) // only those with an ID
            .map(item => item.id);

        // Step 3: Delete items not in the incoming list
        const cartItemsToDelete = existingItems.filter(item => !incomingCartItemIds.includes(item.id));

        await Promise.all(
            cartItemsToDelete.map(item =>
                db.cartItem.delete({
                    where: { id: item.id },
                })
            )
        );

        // Step 4: Create new items or update existing ones
        await Promise.all(
            items.map(item => {
                return db.cartItem.upsert({
                    where: { cartId_variantId: { cartId: id, variantId: item.variantId } },
                    update: {
                        quantity: item.quantity,
                        message: item.message,
                        image: item.image
                    },
                    create: {
                        cartId: id,
                        variantId: item.variantId,
                        quantity: item.quantity,
                        message: item.message,
                        image: item.image
                    }
                });
            })
        );

        res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            data: cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to update cart"
        });
    }
};

const deleteCart = async (req, res) => {
    const { id } = req.params;

    try {
        const cart = await db.cartItems.delete({
            where: { cartId: id }
        });

        res.status(200).json({
            success: true,
            message: "Cart deleted successfully",
            data: cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to delete cart"
        });
    }
};

module.exports = {
    getCartByUserId,
    updateCart,
    deleteCart
};