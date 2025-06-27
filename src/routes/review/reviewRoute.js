const express = require("express");
const router = express.Router();
const { authorizeRoles, authorize } = require('../../middleware/authorize');
const Roles = require("../../constants/roleEnum")
const reviewController = require("../../controllers/review/reviewController");

router.post("/add-review",authorize, authorizeRoles(Roles.CUSTOMER), reviewController.createReview);
router.put("/update-review/:id",authorize, authorizeRoles(Roles.CUSTOMER), reviewController.updateReview);
router.delete("/delete-review/:id",authorize, authorizeRoles(Roles.CUSTOMER), reviewController.deleteReview);
router.get("/fetch-review-by-productId/:productId", reviewController.fetchReviewByProductId);
module.exports = router;