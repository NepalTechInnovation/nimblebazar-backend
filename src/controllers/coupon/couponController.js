const couponService = require('../../services/coupon/couponService');
const Messages = require('../../constants/messages');
const asyncWrapper = require("../../middleware/asyncWrapper");
const ApiError = require('../../utils/ApiError');
const ApiResponse = require('../../utils/ApiResponse');

exports.createCoupon = asyncWrapper(async (req, res, next) => {
    try {
        const coupon = await couponService.createCoupon(req, res);
        res.status(200).json(new ApiResponse(200, Messages.COUPON.CREATE_SUCCESS, coupon, "coupon"));
    } catch (error) {
        next(error);
    }
});

exports.updateCoupon = asyncWrapper(async (req, res, next) => {
    try {
        const coupon = await couponService.updateCoupon(req, res);
        res.status(200).json(new ApiResponse(200, Messages.COUPON.UPDATE_SUCCESS, coupon, "coupon"));
    } catch (error) {
        next(error);
    }
});

exports.getAllCoupons = asyncWrapper(async (req, res, next) => {
    try {
        const coupons = await couponService.getAllCoupons(req, res);
        res.status(200).json(new ApiResponse(200, Messages.COUPON.FETCH_SUCCESS, coupons, "data"));
    } catch (error) {
        next(error);
    }
});



exports.deleteCoupon = asyncWrapper(async (req, res, next) => {
    try {
        await couponService.deleteCoupon(req, res);
        res.status(200).json(new ApiResponse(200, Messages.COUPON.REMOVED,));
    } catch (error) {
        next(error);
    }
});


exports.validateCoupon = asyncWrapper(async (req, res, next) => {
    try {
        const coupon = await couponService.validateCoupon(req, res);
        res.status(200).json(new ApiResponse(200, Messages.COUPON.CREATE_SUCCESS, coupon, "coupon"));
    } catch (error) {
        next(error);
    }
});

exports.fetchCouponById = asyncWrapper(async (req, res, next) => {
    try {
        const coupon = await couponService.fetchCouponById(req, res);
        res.status(200).json(new ApiResponse(200, Messages.COUPON.FETCH_SUCCESS, coupon, "coupon"));
    } catch (error) {
        next(error);
    }
});