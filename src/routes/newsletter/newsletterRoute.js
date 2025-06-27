const express = require("express");
const router = express.Router();
const { authorizeRoles, authorize } = require('../../middleware/authorize');
const Roles = require("../../constants/roleEnum")
const newsletterController = require("../../controllers/newsletter/newsletterController");

router.post("/add-newsletter", newsletterController.addNewsletter);
// router.put("/update-review/:id",authorize, authorizeRoles(Roles.CUSTOMER), reviewController.updateReview);
// router.delete("/delete-review/:id",authorize, authorizeRoles(Roles.CUSTOMER), reviewController.deleteReview);
router.get("/fetch-all-newsletter", authorize, authorizeRoles(Roles.SUPER_ADMIN), newsletterController.fetchAllNewsletter);
router.get("/search-newsletter", authorize, authorizeRoles( Roles.SUPER_ADMIN), newsletterController.searchNewsletter);

module.exports = router;