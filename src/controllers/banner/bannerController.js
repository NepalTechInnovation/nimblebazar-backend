const bannerService = require('../../services/banner/bannerService');
const Messages = require('../../constants/messages');
const asyncWrapper = require("../../middleware/asyncWrapper");
const ApiError = require('../../utils/ApiError');
const ApiResponse = require('../../utils/ApiResponse');

exports.createBanner = asyncWrapper(async (req, res, next) => {
    try {
        const banner = await bannerService.createBanner(req, res);
        res.status(200).json(new ApiResponse(200, Messages.BANNER.CREATE_SUCCESS, banner, "banner"));
    } catch (error) {
        next(error);
    }
});



exports.fetchAllBanner = asyncWrapper(async (req, res, next) => {
    try {
        const banners = await bannerService.fetchAllBanner(req, res);
        res.status(200).json(new ApiResponse(200, Messages.BANNER.FETCH_SUCCESS, banners, "banners"));
    } catch (error) {
        next(error);
    }
});

exports.updateBanner = asyncWrapper(async (req, res, next) => {
    try {
        const banner = await bannerService.updateBanner(req, res);
        res.status(200).json(new ApiResponse(200, Messages.BANNER.UPDATE_SUCCESS, banner, "banner"));
    } catch (error) {
        next(error);
    }
});



exports.deleteBanner = asyncWrapper(async (req, res, next) => {
    try {
        await bannerService.deleteBanner(req, res);
        res.status(200).json(new ApiResponse(200, Messages.BANNER.REMOVED,));
    } catch (error) {
        next(error);
    }
});



exports.fetchStoryAndMission = asyncWrapper(async (req, res, next) => {
    try {
        const banners = await bannerService.fetchStoryAndMission(req, res);
        res.status(200).json(new ApiResponse(200, Messages.BANNER.FETCH_SUCCESS, banners, "banners"));
    } catch (error) {
        next(error);
    }
});

exports.fetchBannerById = asyncWrapper(async (req, res, next) => {
    try {
        const banner = await bannerService.fetchBannerById(req, res);
        res.status(200).json(new ApiResponse(200, Messages.BANNER.FETCH_SUCCESS, banner, "banner"));
    } catch (error) {
        next(error);
    }
});
