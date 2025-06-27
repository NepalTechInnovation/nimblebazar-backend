
const productAttributeService = require('../../services/product/productAttributeService');
const asyncWrapper = require("../../middleware/asyncWrapper");
const ApiResponse = require('../../utils/ApiResponse');
const Messages = require('../../constants/messages');
exports.createProductAttribute = asyncWrapper(async (req, res, next) => {
  try {
    const attribute = await productAttributeService.createProductAttribute(req, res);
    res.status(200).json(new ApiResponse(200, Messages.PRODUCT_ATTRIBUTE.CREATE_SUCCESS,attribute,"attribute",))
  } catch (error) {
    next(error);
  }
});

exports.getAllAttributes = asyncWrapper(async (req, res, next) => {
  try {
    const attributes = await productAttributeService.getAllAttributes(req, res);
    res.status(200).json(new ApiResponse(200, Messages.PRODUCT_ATTRIBUTE.FETCH_SUCCESS,attributes,"attributes",))
  } catch (error) {
    next(error);
  }
});

exports.getAttributeById = asyncWrapper(async (req, res, next) => {
  try {
    const attribute = await productAttributeService.getAttributeById(req, res);
    res.status(200).json(new ApiResponse(200, Messages.PRODUCT_ATTRIBUTE.FETCH_SUCCESS,attribute,"attribute",))
  } catch (error) {
    next(error);
  }
});

exports.updateAttribute = asyncWrapper(async (req, res, next) => {
  try {
    const attribute = await productAttributeService.updateAttribute(req, res);
    res.status(200).json(new ApiResponse(200, Messages.PRODUCT_ATTRIBUTE.UPDATE_SUCCESS,attribute,"attribute",))
  } catch (error) {
    next(error);
  }
});

exports.deleteAttribute = asyncWrapper(async (req, res, next) => {
  try {
     await productAttributeService.deleteAttribute(req, res);
    res.status(200).json(new ApiResponse(200, Messages.PRODUCT_ATTRIBUTE.DELETE_SUCCESS))
  } catch (error) {
    next(error);
  }
});