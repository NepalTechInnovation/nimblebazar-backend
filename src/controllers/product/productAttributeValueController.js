
const productAttributeValueService = require('../../services/product/productAttributeValueService');
const asyncWrapper = require("../../middleware/asyncWrapper");
const ApiResponse = require('../../utils/ApiResponse');
const Messages = require('../../constants/messages');
exports.createProductAttributeValue = asyncWrapper(async (req, res, next) => {
  try {
    const attribute = await productAttributeValueService.createProductAttributeValue(req, res);
    res.status(200).json(new ApiResponse(200, Messages.PRODUCT_ATTRIBUTE.CREATE_SUCCESS, attribute, "attribute",))
  } catch (error) {
    next(error);
  }
});

exports.getAllProductAttributeValue = asyncWrapper(async (req, res, next) => {
  try {
    const attributes = await productAttributeValueService.getAllProductAttributeValue(req, res);
    res.status(200).json(new ApiResponse(200, Messages.PRODUCT_ATTRIBUTE.FETCH_SUCCESS, attributes, "attributes",))
  } catch (error) {
    next(error);
  }
});

exports.getAttributeById = asyncWrapper(async (req, res, next) => {
  try {
    const attribute = await productAttributeValueService.getAttributeById(req, res);
    res.status(200).json(new ApiResponse(200, Messages.PRODUCT_ATTRIBUTE.FETCH_SUCCESS, attribute, "attribute",))
  } catch (error) {
    next(error);
  }
});

exports.updateAttribute = asyncWrapper(async (req, res, next) => {
  try {
    const attribute = await productAttributeValueService.updateAttribute(req, res);
    res.status(200).json(new ApiResponse(200, Messages.PRODUCT_ATTRIBUTE.UPDATE_SUCCESS, attribute, "attribute",))
  } catch (error) {
    next(error);
  }
});

exports.deleteAttribute = asyncWrapper(async (req, res, next) => {
  try {
    await productAttributeValueService.deleteAttribute(req, res);
    res.status(200).json(new ApiResponse(200, Messages.PRODUCT_ATTRIBUTE.DELETE_SUCCESS))
  } catch (error) {
    next(error);
  }
});