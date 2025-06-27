
const categoryService = require('../../services/product/categoryService');
const asyncWrapper = require("../../middleware/asyncWrapper");
const { PrismaClient } = require('@prisma/client');
const ApiError = require('../../utils/ApiError');
const ApiResponse = require('../../utils/ApiResponse');
const Messages = require('../../constants/messages');
exports.createCategory = asyncWrapper(async (req, res, next) => {
  try {

    const category = await categoryService.createCategory(req, res);
    res.status(200).json(new ApiResponse(200, Messages.CATEGORY.CREATE_SUCCESS, category))
  } catch (error) {
    next(error);
  }
});

exports.updateCategory = asyncWrapper(async (req, res, next) => {
  try {

    const category = await categoryService.updateCategory(req, res);
    res.status(200).json(new ApiResponse(200, Messages.CATEGORY.UPDATE_SUCCESS, category))
  } catch (error) {
    next(error);
  }
});

exports.deleteCategory = asyncWrapper(async (req, res, next) => {
  try {

   await categoryService.deleteCategory(req, res);
    res.status(200).json(new ApiResponse(200, Messages.CATEGORY.DELETE_SUCCESS))
  } catch (error) {
    next(error);
  }
});

exports.getAllCategories = asyncWrapper(async (req, res, next) => {
  try {

    const categories = await categoryService.getAllCategories(req, res);
    res.status(200).json(new ApiResponse(200, Messages.CATEGORY.FETCH_SUCCESS, categories,"categories"))
  } catch (error) {
    next(error);
  }
});
exports.getAllSubCategories = asyncWrapper(async (req, res, next) => {
  try {

    const subcategories = await categoryService.getAllSubCategories(req, res);
    res.status(200).json(new ApiResponse(200, Messages.CATEGORY.FETCH_SUCCESS, subcategories,"subcategories"))
  } catch (error) {
    next(error);
  }
});

exports.fetchCategoryById = asyncWrapper(async (req, res, next) => {
  try {

    const category = await categoryService.fetchCategoryById(req, res);
    res.status(200).json(new ApiResponse(200, Messages.CATEGORY.FETCH_SUCCESS, category,"category"))
  } catch (error) {
    next(error);
  }
});


exports.fetchAllActiveCategories = asyncWrapper(async (req, res, next) => {
  try {

    const categories = await categoryService.fetchAllActiveCategories(req, res);
    res.status(200).json(new ApiResponse(200, Messages.CATEGORY.FETCH_SUCCESS, categories,"categories"))
  } catch (error) {
    next(error);
  }
});

exports.fetchAllInactiveCategories = asyncWrapper(async (req, res, next) => {
  try {

    const categories = await categoryService.fetchAllDeleteCategories(req, res);
    res.status(200).json(new ApiResponse(200, Messages.CATEGORY.FETCH_SUCCESS, categories,"categories"))
  } catch (error) {
    next(error);
  }
});