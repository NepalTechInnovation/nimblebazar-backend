
const testimonialService = require('../../services/testimonial/testimonialService');
const asyncWrapper = require("../../middleware/asyncWrapper");
const ApiResponse = require('../../utils/ApiResponse');
const Messages = require('../../constants/messages');
exports.addTestimonial = asyncWrapper(async (req, res, next) => {
    try {
        const testimonial = await testimonialService.addTestimonial(req, res);
        res.status(200).json(new ApiResponse(200, Messages.TESTIMONIAL.CREATE_SUCCESS, testimonial, "testimonial"))
    } catch (error) {
        next(error);
    }
});

exports.updateTestimonial = asyncWrapper(async (req, res, next) => {
    try {
        const testimonial = await testimonialService.updateTestimonial(req, res);
        res.status(200).json(new ApiResponse(200, Messages.TESTIMONIAL.UPDATE_SUCCESS, testimonial, "testimonial"))
    } catch (error) {
        next(error);
    }
});

exports.deleteTestimonial = asyncWrapper(async (req, res, next) => {
    try {
        await testimonialService.deleteTestimonial(req, res);
        res.status(200).json(new ApiResponse(200, Messages.TESTIMONIAL.DELETE_SUCCESS,))
    } catch (error) {
        next(error);
    }
});

exports.fetchAllTestimonial = asyncWrapper(async (req, res, next) => {
    try {
        const testimonials = await testimonialService.fetchAllTestimonial(req, res);
        res.status(200).json(new ApiResponse(200, Messages.TESTIMONIAL.FETCH_SUCCESS, testimonials, "testimonials"))
    } catch (error) {
        next(error);
    }
});

exports.fetchTestimonialById = asyncWrapper(async (req, res, next) => {
    try {
        const testimonial = await testimonialService.fetchTestimonialById(req, res);
        res.status(200).json(new ApiResponse(200, Messages.TESTIMONIAL.FETCH_SUCCESS, testimonial, "testimonial"))
    } catch (error) {
        next(error);
    }
});