
const wishlistService = require('../../services/wishlist/wishlistService');
const asyncWrapper = require("../../middleware/asyncWrapper");
const { PrismaClient } = require('@prisma/client');
const ApiError = require('../../utils/ApiError');
const ApiResponse = require('../../utils/ApiResponse');
const Messages = require('../../constants/messages');

exports.createWishlist = asyncWrapper(async (req, res, next) => {
    try {
        const wishlist = await wishlistService.createWishlist(req, res);
        res.status(200).json(new ApiResponse(200, Messages.WISHLIST.CREATE_SUCCESS, wishlist, "wishlist"))
    } catch (error) {
        next(error);
    }
});


exports.fetchAllWishlist = asyncWrapper(async (req, res, next) => {
    try {
        const data = await wishlistService.fetchAllWishlist(req, res);
        res.status(200).json(new ApiResponse(200, Messages.WISHLIST.FETCH_SUCCESS, data, "data"))
    } catch (error) {
        next(error);
    }
});

exports.deleteWishlist = asyncWrapper(async (req, res, next) => {
    try {
        await wishlistService.deleteWishlist(req, res);
        res.status(200).json(new ApiResponse(200, Messages.WISHLIST.DELETE_SUCCESS))
    } catch (error) {
        next(error);
    }
});

