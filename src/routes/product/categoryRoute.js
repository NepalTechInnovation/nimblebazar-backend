const express = require("express");
const router = express.Router();

const categoryController = require("../../controllers/product/categoryController");
const { validate } = require('../../middleware/validateMiddleware');
const { authorizeRoles, authorize } = require('../../middleware/authorize');
const { validateProductCategory } = require('../../validators/product/productValidator');
const Roles = require("../../constants/roleEnum");

router.post("/create-product-category", authorize, authorizeRoles(Roles.SUPER_ADMIN), validate, validateProductCategory, categoryController.createCategory);
router.put("/update-product-category", authorize, authorizeRoles(Roles.SUPER_ADMIN), validateProductCategory, categoryController.updateCategory);
router.patch("/delete-category/:id", authorize, authorizeRoles(Roles.SUPER_ADMIN), categoryController.deleteCategory);
router.get("/fetch-all-categories",  categoryController.getAllCategories);
router.get("/fetch-all-sub-categories", categoryController.getAllSubCategories);
router.get("/fetch-category-by-id/:id", categoryController.fetchCategoryById);
router.get(
    "/fetch-all-active-categories",
    categoryController.fetchAllActiveCategories
);
router.get("/fetch-all-inactive-categories",  authorize, authorizeRoles(Roles.SUPER_ADMIN), categoryController.fetchAllInactiveCategories);
module.exports = router;
