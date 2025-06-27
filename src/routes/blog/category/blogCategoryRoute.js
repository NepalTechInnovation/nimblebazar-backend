const express = require("express");
const router = express.Router();
const blogCategoryController = require("../../../controllers/blog/category/blogCategoryController");
const { authorizeRoles, authorize } = require('../../../middleware/authorize');
const Roles=require("../../../constants/roleEnum")
router.post("/add-blog-category",authorize, authorizeRoles(Roles.SUPER_ADMIN), blogCategoryController.createCategory);

router.get("/fetch-all-categories", blogCategoryController.getAllCategories);
router.get("/fetch-all-active-categories", blogCategoryController.fetchAllActiveCategories);
router.get("/fetch-blog-category-by-slug/:slug", blogCategoryController.getCategory);

router.get("/get-category-by-slug/:slug", blogCategoryController.getCategory);

router.patch("/update-blog-category/:id",authorize, authorizeRoles(Roles.SUPER_ADMIN), blogCategoryController.updateCategory);

router.delete("/delete-blog-category/:id",authorize, authorizeRoles(Roles.SUPER_ADMIN), blogCategoryController.deleteCategory);
router.get("/fetch-blog-category-by-id/:id", blogCategoryController.fetchCategoryById);
module.exports = router;
