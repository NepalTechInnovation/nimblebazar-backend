const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Messages = require('../../constants/messages');
const ApiError = require('../../utils/ApiError');

exports.fetchAllOrders = async (req, res) => {
    const {
        page = 1,
        limit = 10
    } = req.query;
    const count = await prisma.order.count();
    const totalPages = Math.ceil(count / limit);
    const orders = await prisma.order.findMany({
        take: limit,
        skip: (page - 1) * limit,
        include: {
            items: {
                include: {
                    product: {

                    }
                }
            },
            payment: true,
            user: true,

        },
    });
    return {
        orders,
        pagination: {
            currentPage: page,
            totalPages,
            limit,
        },
    };
};

exports.updateCustomer = async (req, res, customerId) => {
    const { name, role, isActive } = req.body;
    try {
        const existing = await prisma.user.findUnique({
            where: { id: customerId },
        });

        if (!existing) {
            throw new ApiError(500, Messages.CUSTOMER.NOT_FOUND);
        }
        const updatedAdmin = await prisma.user.update({
            where: { id: customerId },
            data: {
                name,
                role,
                isActive,
            },
        });

    } catch (error) {
        throw new ApiError(500, error.message);
    }
};
