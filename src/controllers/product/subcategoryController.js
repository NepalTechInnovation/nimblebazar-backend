const subcategoryService = require('../../services/product/subcategoryService');
const ApiError = require('../../utils/ApiError');
const ApiResponse = require('../../utils/ApiResponse');
const asyncWrapper = require("../../middleware/asyncWrapper");
const Messages = require('../../constants/messages');
exports.createSubcategory = asyncWrapper(async (req, res, next) => {
  try {

    const category = await subcategoryService.createSubCategory(req, res);
    res.status(200).json(new ApiResponse(200, Messages.SUB_CATEGORY.CREATE_SUCCESS, category))
  } catch (error) {
    next(error);
  }
});

exports.updateSubcategory = asyncWrapper(async (req, res, next) => {
  try {

    const category = await subcategoryService.updateSubCategory(req, res);
    res.status(200).json(new ApiResponse(200, Messages.SUB_CATEGORY.UPDATE_SUCCESS, category))
  } catch (error) {
    next(error);
  }
});

exports.deleteSubcategory = asyncWrapper(async (req, res, next) => {
  try {

    const category = await subcategoryService.deleteSubCategory(req, res);
    res.status(200).json(new ApiResponse(200, Messages.SUB_CATEGORY.UPDATE_SUCCESS, category))
  } catch (error) {
    next(error);
  }
});

exports.fetchAllSubcategories = asyncWrapper(async (req, res, next) => {
  try {

    const categories = await subcategoryService.getAllSubCategories(req, res);
    res.status(200).json(new ApiResponse(200, Messages.SUB_CATEGORY.UPDATE_SUCCESS, categories,"categories"))
  } catch (error) {
    next(error);
  }
});