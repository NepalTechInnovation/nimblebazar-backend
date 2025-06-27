const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ApiError = require('../../utils/ApiError');
const Messages = require('../../constants/messages');
exports.addTestimonial = async (req, res) => {
    const { name, message, avatar, designation, order } = req.body;
    const testimonial = await prisma.testimonial.create({
        data: {
            name, message, avatar, designation, order
        }
    });
    return testimonial;
}

exports.updateTestimonial = async (req, res) => {
    const { id } = req.params;
    const existing = await prisma.testimonial.findFirst({
        where: { id },
    });
    if (!existing) {
        throw new ApiError(500, Messages.TESTIMONIAL.ERROR);
    }
    const { name, message, avatar, designation, order } = req.body;
    const testimonial = await prisma.testimonial.update({
        where: {
            id: id
        },
        data: {
            name, message, avatar, designation, order
        }
    });
    return testimonial;
}


exports.deleteTestimonial = async (req, res) => {
    const { id } = req.params;
    const existing = await prisma.testimonial.findFirst({
        where: { id },
    });
    if (!existing) {
        throw new ApiError(500, Messages.TESTIMONIAL.ERROR);
    }
    const testimonial = await prisma.testimonial.delete({
        where: {
            id: id
        }
    });
    return testimonial;
}


exports.fetchAllTestimonial = async (req, res) => {
    const testimonials = await prisma.testimonial.findMany({
        orderBy: {
            order: "asc"
        }
    });
    return testimonials;
}

exports.fetchTestimonialById = async (req, res) => {
      const { id } = req.params;
    const testimonial = await prisma.testimonial.findUnique({
        where:{
            id
        },
    });
    return testimonial;
}