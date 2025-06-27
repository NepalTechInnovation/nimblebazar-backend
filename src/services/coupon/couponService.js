
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const generateUniqueSlug = require('../../utils/slugify');
const ApiError = require('../../utils/ApiError');
const Messages = require('../../constants/messages');
const createCoupon = async (req, res) => {

    const {
        code,
        expiryDate,
        discountAmount = null,
        discountPercent = null,
        couponCount = 0,
        type: type,
    } = req.body;

    // try {
    const existingCoupon = await prisma.coupon.findUnique({
        where: { code: code.trim() },
    });

    if (existingCoupon) {
        throw new ApiError(500, 'Coupon code already exists');
    }
    const upperCaseType = type.trim().toUpperCase();
    const parseDate = new Date(expiryDate);
    const coupon = await prisma.coupon.create({
        data: {
            code,

            expiryDate: parseDate,
            discountAmount,
            discountPercent,
            couponCount,
            type: upperCaseType

        }
    });
    return coupon
        ;
    // }
    // catch (error) {
    //     throw new ApiError(500, "Unable to create coupon"
    //     );
    // }
};

const updateCoupon = async (req, res) => {
    const {
        code,
        expiryDate,
        discountAmount = null,
        discountPercent = null,
        couponCount = 0,
        type: type,
        isActive
    } = req.body;

    try {
        const { id } = req.params;
        const parseDate = new Date(expiryDate);
        const upperCaseType = type.trim().toUpperCase();
        const coupon = await prisma.coupon.update({
            where: { id },
            data: {
                code,
                expiryDate: parseDate,
                discountAmount,
                discountPercent,
                couponCount,
                type: upperCaseType,
                isActive: isActive

            }
        });

        return coupon

            ;
    }
    catch (error) {
        throw new ApiError(500, "Unable to update coupon"
        );
    }
};

const deleteCoupon = async (req, res) => {
    const { id } = req.params;

    try {
        const coupon = await prisma.coupon.delete({
            where: { id }
        });

        return coupon;
    }
    catch (error) {
        throw new ApiError(500, "Unable to delete coupon"
        );
    }
};

const getAllCoupons = async (req, res) => {
    const {
        page = 1,
        limit = 10
    } = req.query;

    const count = await prisma.coupon.count();
    const totalPages = Math.ceil(count / limit);

    try {
        const coupons = await prisma.coupon.findMany({
            take: limit,
            skip: (page - 1) * limit
        });

        return {
            coupons,
            pagination: {
                currentPage: page,
                totalPages,
                limit,
            },
        };

    } catch (error) {
        throw new ApiError("Unable to fetch coupons"
        );
    }
};



const validateCoupon = async (req, res) => {
    const {
        code,
    } = req.body;
    const existingCoupon = await prisma.coupon.findUnique({
        where: { code: code },
    });

    if (!existingCoupon) {
        throw new ApiError(500, 'Invalid coupon code.');
    }

    const now = new Date();
    if (existingCoupon.expiryDate && existingCoupon.expiryDate < now) {
        throw new ApiError(500, 'This coupon has expired.');
    }

    if (existingCoupon.usageLimit && existingCoupon.timesUsed >= existingCoupon.usageLimit) {
        throw new ApiError(500, 'This coupon has reached its usage limit.');
    }
    return existingCoupon;
}

const fetchCouponById = async (req, res) => {
    const { id } = req.params;
    try {
        const coupon = await prisma.coupon.findFirst({
            where: {
                id: id
            }
        });

        return coupon;

    } catch (error) {
        throw new ApiError("Unable to fetch coupon");
    }
};
module.exports = {
    createCoupon,
    updateCoupon,
    deleteCoupon,
    getAllCoupons,
    validateCoupon,
    fetchCouponById
}