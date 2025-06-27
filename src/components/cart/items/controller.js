// model CartItem {
//     id String @id @default(cuid())
  
//     cartId String
//     cart   Cart   @relation(fields: [cartId], references: [id], onDelete: Cascade)
  
//     variantId String
//     variant   Variant @relation(fields: [variantId], references: [id], onDelete: Cascade)
  
//     quantity Int
//     message  String?
//     image    String?
  
//     @@map("cart_items")
//   }

const db = require("../../../config/db");

const createCartItem = async (req, res) => {
    const {
        cartId,
        variantId,
        quantity,
        message = null,
        image = null
    } = req.body;

    try {
        const cartItem = await db.cartItem.create({
            data: {
                cartId,
                variantId,
                quantity,
                message,
                image
            }
        });

        res.status(201).json({
            success: true,
            message: "Cart item created successfully",
            data: cartItem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to create cart item"
        });
    }
};

const updateCartItem = async (req, res) => {
    const {
        id,
        cartId,
        variantId,
        quantity,
        message = null,
        image = null
    } = req.body;

    try {
        const cartItem = await db.cartItem.update({
            where: { id },
            data: {
                cartId,
                variantId,
                quantity,
                message,
                image
            }
        });

        res.status(200).json({
            success: true,
            message: "Cart item updated successfully",
            data: cartItem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to update cart item"
        });
    }
};

const deleteCartItem = async (req, res) => {
    const { id } = req.params;

    try {
        const cartItem = await db.cartItem.delete({
            where: { id }
        });

        res.status(200).json({
            success: true,
            message: "Cart item deleted successfully",
            data: cartItem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to delete cart item"
        });
    }
};

const getCartItemsByCartId = async (req, res) => {
    const { cartId } = req.params;

    try {
        const cartItems = await db.cartItem.findMany({
            where: {
                cartId
            }
        });

        res.status(200).json({
            success: true,
            message: "Cart items fetched successfully",
            data: cartItems
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to fetch cart items"
        });
    }
};

module.exports = {
    createCartItem,
    updateCartItem,
    deleteCartItem,
    getCartItemsByCartId
};