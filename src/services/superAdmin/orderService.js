const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Messages = require('../../constants/messages');

const Roles = require('../../constants/roleEnum');
const ApiError = require('../../utils/ApiError');
exports.fetchAllOrders = async () => {
    try {
        return await prisma.order.findMany({
            include: {
                items: {
                    include:{
                        product:{
                            include:{
                                media:true,
                            }
                        }
                    }
                },
                shippingAddress: true,
                billingAddress: true,
                payment: true
            },
        });
    } catch (e) {
        throw new ApiError(500, Messages.GENERAL.SOMETHING_WENT_WRONG);
    }

};

exports.searchOrder = async (searchQuery = '') => {
    try {
        return await prisma.order.findMany({
            where: {
                OR: [
                    {
                        id: {
                            contains: searchQuery,
                            mode: 'insensitive',
                        },
                    },

                ],
            },
            include: {
                items: {
                    include:{
                        product:{
                            include:{
                                media:true,
                            }
                        }
                    }
                },
                shippingAddress: true,
                billingAddress: true,
                payment: true
            },
        });
    }
    catch (e) {
        throw new ApiError(500, Messages.GENERAL.SOMETHING_WENT_WRONG);
    }
};