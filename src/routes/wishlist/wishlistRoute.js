const express = require("express");
const router = express.Router();
const { authorizeRoles, authorize } = require('../../middleware/authorize');
const Roles = require("../../constants/roleEnum")
const wishlistController = require("../../controllers/wishlist/wishlistController");

router.post("/add-wishlist", authorize, authorizeRoles(Roles.CUSTOMER), wishlistController.createWishlist);
// router.put("/update-review",authorize, authorizeRoles(Roles.CUSTOMER), reviewController.updateReview);
router.delete("/delete-product/:wishlistId",authorize, authorizeRoles(Roles.CUSTOMER), wishlistController.deleteWishlist);
router.get("/fetch-all-wishlist",authorize, authorizeRoles(Roles.CUSTOMER), wishlistController.fetchAllWishlist);
module.exports = router;