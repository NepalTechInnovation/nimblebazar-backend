
const socialMediaService = require('../../services/socialMedia/socialMediaService');
const asyncWrapper = require("../../middleware/asyncWrapper");
const ApiResponse = require('../../utils/ApiResponse');
const Messages = require('../../constants/messages');
exports.addSocialMedia = asyncWrapper(async (req, res, next) => {
    try {
        const setting = await socialMediaService.addSocialMedia(req, res);
        res.status(200).json(new ApiResponse(200, Messages.SITE_SETTING.CREATE_SUCCESS, setting, "setting"))
    } catch (error) {
        next(error);
    }
});

exports.updateSocialMedia = asyncWrapper(async (req, res, next) => {
    try {
        const setting = await socialMediaService.updateSocialMedia(req, res);
        res.status(200).json(new ApiResponse(200, Messages.SITE_SETTING.UPDATE_SUCCESS, setting, "setting"))
    } catch (error) {
        next(error);
    }
});

exports.deleteSocialMedia = asyncWrapper(async (req, res, next) => {
    try {
        await socialMediaService.deleteSocialMedia(req, res);
        res.status(200).json(new ApiResponse(200, Messages.SITE_SETTING.DELETE_SUCCESS,))
    } catch (error) {
        next(error);
    }
});

exports.fetchAllActiveInOrderSocialMedia = asyncWrapper(async (req, res, next) => {
    try {
        const setting = await socialMediaService.fetchAllActiveInOrderSocialMedia(req, res);
        res.status(200).json(new ApiResponse(200, Messages.SITE_SETTING.FETCH_SUCCESS, setting, "setting"))
    } catch (error) {
        next(error);
    }
});

exports.fetchSocialMediaById = asyncWrapper(async (req, res, next) => {
    try {
        const setting = await socialMediaService.fetchSocialMediaById(req, res);
        res.status(200).json(new ApiResponse(200, Messages.SITE_SETTING.FETCH_SUCCESS, setting, "setting"))
    } catch (error) {
        next(error);
    }
});