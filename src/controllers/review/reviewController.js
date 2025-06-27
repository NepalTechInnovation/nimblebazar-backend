
const reviewService = require('../../services/review/reviewService');
const asyncWrapper = require("../../middleware/asyncWrapper");
const { PrismaClient } = require('@prisma/client');
const ApiError = require('../../utils/ApiError');
const ApiResponse = require('../../utils/ApiResponse');
const Messages = require('../../constants/messages');
const { review } = require('../../config/db');

exports.createReview = asyncWrapper(async (req, res, next) => {
    try {
        const review = await reviewService.createReview(req, res);
        res.status(200).json(new ApiResponse(200, Messages.REVIEW.CREATE_SUCCESS, review, "review"))
    } catch (error) {
        next(error);
    }
});

exports.updateReview = asyncWrapper(async (req, res, next) => {
    try {

        const review = await reviewService.updateReview(req,res);
        res.status(200).json(new ApiResponse(200, Messages.REVIEW.UPDATE_SUCCESS, review))
    } catch (error) {
        next(error);
    }
});

exports.deleteReview = asyncWrapper(async (req, res, next) => {
    try {

        await reviewService.deleteReview(req,res);
        res.status(200).json(new ApiResponse(200, Messages.REVIEW.REMOVED))
    } catch (error) {
        next(error);
    }
});

exports.fetchReviewByProductId = asyncWrapper(async (req, res, next) => {
    try {
        const reviews = await reviewService.fetchReviewByProductId(req,res);
        res.status(200).json(new ApiResponse(200, Messages.REVIEW.FETCH_SUCCESS, reviews, "reviews"))
    } catch (error) {
        next(error);
    }
});

