const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ApiError = require('../../utils/ApiError');
const Messages = require('../../constants/messages');
exports.createPayment = async (req, userId) => {
    // try {
    const { method, status, amount, orderId } = req.body;
    const payment = await prisma.payment.create({
        data: { method,  status, amount, orderId, userId: userId },
    });
    return payment;
    // } catch (error) {
    //     throw new ApiError(500, Messages.GENERAL.SOMETHING_WENT_WRONG);
    // }
};


exports.getAllPayments = async (req, res) => {
    try {
        const payments = await prisma.payment.findMany({
            include: { order: true },
        });
        return payments;
    } catch (error) {
        throw new ApiError(500, Messages.GENERAL.SOMETHING_WENT_WRONG);
    }
};


exports.getPaymentById = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await prisma.payment.findUnique({
            where: { id },
            include: { order: true },
        });
        if (!payment) return res.status(404).json({ error: 'Payment not found' });
        return payment;
    } catch (error) {
        throw new ApiError(500, Messages.GENERAL.SOMETHING_WENT_WRONG);
    }
};


exports.updatePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const { method, status, amount } = req.body;

        const payment = await prisma.payment.update({
            where: { id },
            data: { method, status, amount },
        });

        return payment;
    } catch (error) {
        throw new ApiError(500, Messages.GENERAL.SOMETHING_WENT_WRONG);
    }
};

exports.deletePayment = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.payment.update({
            where: { id },
            data: { isActive: false },
        });

    } catch (error) {
        throw new ApiError(500, Messages.GENERAL.SOMETHING_WENT_WRONG);
    }
};
