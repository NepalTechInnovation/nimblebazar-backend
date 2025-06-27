const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ApiError = require('../../utils/ApiError');
const Messages = require('../../constants/messages');
const createReview = async (req, res) => {
    const { id } = req.user;
    const {
        rating,
        comment = null,
        images = [],
        productId,
    } = req.body;


    try {
        const review = await prisma.review.create({
            data: {
                rating,
                comment,
                images,
                productId,
                userId: id,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatar:true
                    }
                }
            }
        });

        return review;
    } catch (error) {
        throw new ApiError(500, "Unable to create review"
        );
    }
};

const updateReview = async (req, res) => {
    const {
        
        rating,
        comment = null,
        images = []
    } = req.body;
 const { id } = req.params;
    try {
        const review = await prisma.review.update({
            where: { id },
            data: {
                rating,
                comment,
                images,
            },
              include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatar:true
                    }
                }
            }
        });

        return review
            ;
    } catch (error) {
        throw new ApiError(500, "Unable to update review"
        );
    }
};

const deleteReview = async (req, res) => {
    const { id } = req.params;

    const {
        prevStars,
        totalReviewCount
    } = req.query;

    try {
        const review = await prisma.review.delete({
            where: { id }
        });

        let newAverage;

        if (prevStars && totalReviewCount) {
            const prevAvg = parseFloat(prevStars);
            const total = parseInt(totalReviewCount);
            const deletedRating = parseFloat(ratingToDelete);

            const newTotal = total - 1;
            newAverage = newTotal > 0
                ? ((prevAvg * total) - deletedRating) / newTotal
                : 0; // no reviews left
        } else {
            const reviews = await prisma.review.findMany({
                where: { productId },
                select: { rating: true }
            });

            if (reviews.length === 0) {
                newAverage = 0;
            } else {
                const total = reviews.reduce((acc, cur) => acc + parseFloat(cur.rating), 0);
                newAverage = total / reviews.length;
            }
        }

        await prisma.product.update({
            where: { id: productId },
            data: { rating: newAverage }
        });

        return review
            ;
    } catch (error) {
        throw new ApiError(500, "Unable to delete review"
        );
    }
};
// reviewService.js or reviewService.ts
const fetchReviewByProductId = async (req, res) => {
    const { productId } = req.params;
    if (!productId) {
        throw new Error("Product ID is required");
    }

    const reviews = await prisma.review.findMany({
        where: { productId },
        include: {
             user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatar:true
                    }
                },
            product: true,
        },
    });

    return reviews;
};

module.exports = {
    createReview,
    updateReview,
    deleteReview,
    fetchReviewByProductId
};