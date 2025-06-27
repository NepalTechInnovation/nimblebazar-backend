const shippingService = require('../../services/shippingAddress/shippingAddressService');
const ApiError = require('../../utils/ApiError');
const ApiResponse = require('../../utils/ApiResponse');
const asyncWrapper = require("../../middleware/asyncWrapper");
const Messages = require('../../constants/messages');
exports.create = asyncWrapper(async (req, res, next) => {
    try {
        const address = await shippingService.createShippingAddress(req.body, req.user.id);
        res.status(200).json(new ApiResponse(200, Messages.SHIPPING_ADDRESS.CREATE_SUCCESS, address))
    } catch (err) {
        next(err);
    }
});

exports.getById = asyncWrapper(async (req, res, next) => {
    try {
        const address = await shippingService.getShippingAddressById(req.params.id);
        res.status(200).json(new ApiResponse(200, Messages.SHIPPING_ADDRESS.FETCH_SUCCESS, address))
    } catch (err) {
        next(err);
    }
});

exports.getAllByUser = asyncWrapper(async (req, res, next) => {
    try {
        const addresses = await shippingService.getAllShippingAddressesByUser(req.user.id);
        res.status(200).json(new ApiResponse(200, Messages.SHIPPING_ADDRESS.FETCH_SUCCESS, addresses,"addresses"))
    } catch (err) {
        next(err);
    }
});

exports.update = asyncWrapper(async (req, res, next) => {
    try {
        const updated = await shippingService.updateShippingAddress(req.params.id, req.body);
        res.status(200).json(new ApiResponse(200, Messages.SHIPPING_ADDRESS.UPDATE_SUCCESS, updated))
    } catch (err) {
        next(err);
    }
});

exports.remove = asyncWrapper(async (req, res, next) => {
    try {
        await shippingService.deleteShippingAddress(req.params.id);
        res.status(200).json(new ApiResponse(200, Messages.SHIPPING_ADDRESS.DELETE_SUCCESS))
    } catch (err) {
        next(err);
    }
});
