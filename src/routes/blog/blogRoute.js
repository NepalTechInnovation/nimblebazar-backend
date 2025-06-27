const express = require("express");
const router = express.Router();
const blogController = require("../../controllers/blog/blogController");
const { authorizeRoles, authorize } = require('../../middleware/authorize');
const Roles=require("../../constants/roleEnum");
const { validateBlog } = require("../../validators/product/blogValidator");
router.post("/create-blog",authorize, authorizeRoles(Roles.SUPER_ADMIN),validateBlog, blogController.createBlog);

router.get("/fetch-all-blogs", blogController.getAllBlogs);

router.patch("/update-blog/:id", authorize, authorizeRoles(Roles.SUPER_ADMIN),blogController.updateBlog);

router.delete("/delete-blog/:id",authorize, authorizeRoles(Roles.SUPER_ADMIN), blogController.deleteBlog);
router.get("/fetch-blog-by-slug/:slug", blogController.getBlog);

module.exports = router;
