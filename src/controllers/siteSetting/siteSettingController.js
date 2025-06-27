const siteSettingService = require('../../services/siteSetting/siteSetttingService');
const asyncWrapper = require("../../middleware/asyncWrapper");
const ApiResponse = require('../../utils/ApiResponse');
const Messages = require('../../constants/messages');
exports.addOrUpdateSetting = asyncWrapper(async (req, res, next) => {
    try {
        const setting = await siteSettingService.addOrUpdateSetting(req, res);
        res.status(200).json(new ApiResponse(200, Messages.SITE_SETTING.CREATE_SUCCESS, setting, "setting"))
    } catch (error) {
        next(error);
    }
});

exports.fetchSiteSetting = asyncWrapper(async (req, res, next) => {
    try {
        const setting = await siteSettingService.fetchSiteSetting(req, res);
        res.status(200).json(new ApiResponse(200, Messages.SITE_SETTING.FETCH_SUCCESS, setting, "setting"))
    } catch (error) {
        next(error);
    }
});