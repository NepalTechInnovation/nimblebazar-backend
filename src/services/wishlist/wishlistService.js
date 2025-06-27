const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Messages = require('../../constants/messages');

const Roles = require('../../constants/roleEnum');
const ApiError = require('../../utils/ApiError');
const { product, user } = require('../../config/db');
exports.fetchAllWishlist = async (req, res) => {
    const userId = req.user.id;

    const {
        page = 1,
        limit = 10
    } = req.query;
    const count = await prisma.wishlist.count();
    const totalPages = Math.ceil(count / limit);
    try {
        const wishlists = await prisma.wishlist.findMany({
            take: limit,
            skip: (page - 1) * limit,
            where: {
                userId: userId
            },
            include: {
                product: {
                },
                
            },
        });
        return {
            wishlists,
            pagination: {
                currentPage: page,
                totalPages,
                limit,
            },

        }
    } catch (e) {
        throw new ApiError(500, Messages.GENERAL.SOMETHING_WENT_WRONG);
    }
};


exports.createWishlist = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;
    try {
        const existing = await prisma.wishlist.findFirst({
            where: { productId: productId, userId: userId },
        });

        if (existing) {
            const updatedWishlist = await prisma.wishlist.update({
                where: { id: existing.id },
                data: { isActive: !existing.isActive },
            });
            return  updatedWishlist ;
        }

        const wishlist = await prisma.wishlist.create({
            data: {
                productId,
                userId,
                isActive: true,
            },
        });

        return  wishlist ;
    } catch (error) {
        throw new ApiError(500, error.message);
    }
};



exports.deleteWishlist = async (req, res) => {
    const { wishlistId } = req.params;
    const userId = req.user.id;
    try {
        const wishlistItem = await prisma.wishlist.findUnique({
            where: {
                id: wishlistId
            },
        });
        if (wishlistItem) {
            await prisma.wishlist.delete({
                where: { id: wishlistId },
            });
        };

    } catch (error) {
        throw new ApiError(500, error.message);
    }
};