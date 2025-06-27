
const newsletterService = require('../../services/newsletter/newsletterService');
const asyncWrapper = require("../../middleware/asyncWrapper");
const { PrismaClient } = require('@prisma/client');
const ApiError = require('../../utils/ApiError');
const ApiResponse = require('../../utils/ApiResponse');
const Messages = require('../../constants/messages');

exports.addNewsletter = asyncWrapper(async (req, res, next) => {
    try {
        await newsletterService.addNewsletter(req, res);
        res.status(200).json(new ApiResponse(200, Messages.SUBSCRIBE.CREATE_SUCCESS))
    } catch (error) {
        next(error);
    }
});

exports.fetchAllNewsletter = asyncWrapper(async (req, res, next) => {
    try {
        const data = await newsletterService.fetchAllNewsletter(req, res);
        res.status(200).json(new ApiResponse(200, Messages.SUBSCRIBE.FETCH_SUCCESS, data, "data"))
    } catch (error) {
        next(error);
    }
});


exports.searchNewsletter = asyncWrapper(async (req, res, next) => {
    try {
        const query = req.query.name || '';
        const newsletters = await newsletterService.searchNewsletter(query, req);
        res.status(200).json(new ApiResponse(200, Messages.SUBSCRIBE.FETCH_SUCCESS, newsletters, "newsletters"))
    } catch (error) {
        next(error);
    }
});