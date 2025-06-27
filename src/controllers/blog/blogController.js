const blogService = require('../../services/blog/blogService');
const Messages = require('../../constants/messages');
const asyncWrapper = require("../../middleware/asyncWrapper");
const ApiError = require('../../utils/ApiError');
const ApiResponse = require('../../utils/ApiResponse');

exports.createBlog = asyncWrapper(async (req, res, next) => {
    try {
        const blog = await blogService.createBlog(req, res);
        res.status(200).json(new ApiResponse(200, Messages.BLOG.CREATE_SUCCESS, blog, "blog"));
    } catch (error) {
        next(error);
    }
});

exports.getBlogs = asyncWrapper(async (req, res, next) => {
    try {
        const blogs = await blogService.getBlogs(req, res);
        res.status(200).json(new ApiResponse(200, Messages.BLOG.FETCH_SUCCESS, blogs, "blogs"));
    } catch (error) {
        next(error);
    }
});

exports.getAllBlogs = asyncWrapper(async (req, res, next) => {
    try {
        const blogs = await blogService.getAllBlogs(req, res);
        res.status(200).json(new ApiResponse(200, Messages.BLOG.FETCH_SUCCESS, blogs, "data"));
    } catch (error) {
        next(error);
    }
});

exports.updateBlog = asyncWrapper(async (req, res, next) => {
    try {
        const blog = await blogService.updateBlog(req, res);
        res.status(200).json(new ApiResponse(200, Messages.BLOG.UPDATE_SUCCESS, blog, "blog"));
    } catch (error) {
        next(error);
    }
});

exports.getBlog = asyncWrapper(async (req, res, next) => {
    try {
        const blog =  await blogService.getBlog(req, res);
        res.status(200).json(new ApiResponse(200, Messages.BLOG.FETCH_SUCCESS, blog, "blog"));
    } catch (error) {
        next(error);
    }
});


exports.deleteBlog = asyncWrapper(async (req, res, next) => {
    try {
         await blogService.deleteBlog(req, res);
        res.status(200).json(new ApiResponse(200, Messages.BLOG.REMOVED,));
    } catch (error) {
        next(error);
    }
});
