const express = require("express");
const router = express.Router();
const subcategoryController = require("../../controllers/product/subcategoryController");
const { authorizeRoles, authorize } = require('../../middleware/authorize');
const Roles = require("../../constants/roleEnum");


router.post("/create-subcategory", authorize, authorizeRoles(Roles.SUPER_ADMIN),  subcategoryController.createSubcategory);
router.put("/update-subcategory", authorize, authorizeRoles(Roles.SUPER_ADMIN),  subcategoryController.updateSubcategory);
router.delete("/delete-subcategory/:id", authorize, authorizeRoles(Roles.SUPER_ADMIN),  subcategoryController.deleteSubcategory);
router.get("/get/by-category/:categoryId", subcategoryController.fetchAllSubcategories);

module.exports = router;