const express = require("express");
const router = express.Router();

const cartController = require("../../controllers/cart/cartController");
const { authorizeRoles, authorize } = require('../../middleware/authorize');
const Roles = require("../../constants/roleEnum");
router.get("/fetch-user-cart",authorize, authorizeRoles(Roles.CUSTOMER), cartController.getCart);
router.put("/update-cart-item/:itemId",authorize, cartController.updateCartItem);
router.delete("/delete-cart-item/:itemId", cartController.removeCartItem);
router.post("/add-to-cart/create",authorize, cartController.addToCart);
router.post("/clear-cart-item",authorize, cartController.clearCart);


// router.post("/items/create", cartController.createCartItem);
// router.put("/items/update", cartController.updateCartItem);
// router.delete("/items/delete/:id", cartController.deleteCartItem);
// router.get("/items/get/by-cartId/:cartId", cartController.getCartItemsByCartId);

module.exports = router;