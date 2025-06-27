const blogCategoryService = require('../../../services/blog/category/blogCategoryService');
const Messages = require('../../../constants/messages');
const ApiResponse = require('../../../utils/ApiResponse');
const asyncWrapper = require("../../../middleware/asyncWrapper");
exports.createCategory = asyncWrapper(async (req, res, next) => {
    try {
        const category = await blogCategoryService.createCategory(req, res);
        res.status(200).json(new ApiResponse(200, Messages.BLOG_CATEGORY.CREATE_SUCCESS, category, "category"));
    } catch (error) {
        next(error);
    }
});

exports.getAllCategories = asyncWrapper(async (req, res, next) => {
    try {
        const categories = await blogCategoryService.getAllCategories(req, res);
        res.status(200).json(new ApiResponse(200, Messages.BLOG.FETCH_SUCCESS, categories, "categories"));
    } catch (error) {
        next(error);
    }
});

exports.fetchAllActiveCategories = asyncWrapper(async (req, res, next) => {
    try {
        const categories = await blogCategoryService.fetchAllActiveCategories(req, res);
        res.status(200).json(new ApiResponse(200, Messages.BLOG.FETCH_SUCCESS, categories, "categories"));
    } catch (error) {
        next(error);
    }
});

exports.getCategory = asyncWrapper(async (req, res, next) => {
    try {
        const categories = await blogCategoryService.getCategory(req, res);
        res.status(200).json(new ApiResponse(200, Messages.BLOG.FETCH_SUCCESS, categories, "categories"));
    } catch (error) {
        next(error);
    }
});

exports.updateCategory = asyncWrapper(async (req, res, next) => {
    try {
        const category = await blogCategoryService.updateCategory(req, res);
        res.status(200).json(new ApiResponse(200, Messages.BLOG.UPDATE_SUCCESS, category, "category"));
    } catch (error) {
        next(error);
    }
});



exports.deleteCategory = asyncWrapper(async (req, res, next) => {
    try {
         await blogCategoryService.deleteCategory(req, res);
        res.status(200).json(new ApiResponse(200, Messages.BLOG_CATEGORY.REMOVED,));
    } catch (error) {
        next(error);
    }
});

exports.fetchCategoryById = asyncWrapper(async (req, res, next) => {
    try {
        const category = await blogCategoryService.fetchCategoryById(req, res);
        res.status(200).json(new ApiResponse(200, Messages.BLOG.FETCH_SUCCESS, category, "category"));
    } catch (error) {
        next(error);
    }
});

