const cartService = require('../../services/cart/cartService');
const Messages = require('../../constants/messages');
const asyncWrapper = require("../../middleware/asyncWrapper");
const ApiError = require('../../utils/ApiError');
const ApiResponse = require('../../utils/ApiResponse');

exports.getCart = asyncWrapper(async (req, res, next) => {
    try {
        const cart = await cartService.getUserCart(req.user.id);
        res.status(200).json(new ApiResponse(200, Messages.CART.FETCH_SUCCESS, cart, "cart"));
    } catch (error) {
        next(error);
    }
});

exports.addToCart =asyncWrapper( async (req, res, next) => {
    const { quantity, productId, total,attributeIds } = req.body;

    try {
        const item = await cartService.addToCart(req.user.id, quantity,productId, total,attributeIds);
        res.status(200).json(new ApiResponse(200, Messages.CART.CREATE_SUCCESS, item, "item"));
    } catch (error) {
        next(error);
    }
});

exports.updateCartItem =asyncWrapper( async (req, res, next) => {
    const { itemId } = req.params;
    const {  quantity, productId, total,attributeIds } = req.body;

    try {
        const updatedItem = await cartService.updateCartItem(itemId, quantity, productId, total, attributeIds);
        res.status(200).json(new ApiResponse(200, Messages.CART.UPDATE_SUCCESS, updatedItem, "item"));
    } catch (error) {
        next(error);
    }
});

exports.removeCartItem =asyncWrapper( async (req, res, next) => {
    const { itemId } = req.params;
    if (!itemId) {
        throw new ApiError(500, Messages.CART.NOT_FOUND);
      }
    try {
        await cartService.removeCartItem(itemId);
        res.status(200).json(new ApiResponse(200, Messages.CART.REMOVED));
    } catch (error) {
        next(error);
    }
});

exports.clearCart =asyncWrapper( async (req, res, next) => {
    try {
        await cartService.clearCart(req.user.id);
        res.status(200).json(new ApiResponse(200, Messages.CART.CLEARED));
    } catch (error) {
        next(error);
    }
});
