const paymentService = require('../../services/payment/paymentService');
const ApiError = require('../../utils/ApiError');
const ApiResponse = require('../../utils/ApiResponse');
const asyncWrapper = require("../../middleware/asyncWrapper");
const Messages = require('../../constants/messages');
exports.createPayment = async (req, res) => {

    const payment = await paymentService.createPayment(req, req.user.id);
    res
        .status(200)
        .json(new ApiResponse(200, Messages.PAYMENT.CREATE_SUCCESS, payment));

};

exports.getAllPayments = async (req, res) => {
    const payments = await paymentService.getAllPayments();
    res.status(200).json(new ApiResponse(200, Messages.PAYMENT.FETCH_SUCCESS, payments, "payments"))
};

exports.getPaymentById = async (req, res) => {
    const { id } = req.params;
    const payment = await paymentService.getPaymentById(id);
    if (!order) return res.status(404).json({ message: 'Payment not found' });
    res.status(200).json(new ApiResponse(200, Messages.PAYMENT.FETCH_SUCCESS, payment, "payment"))
};

exports.updatePayment = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await paymentService.updatePayment(id, status);
    res.status(200).json(new ApiResponse(200, Messages.PAYMENT.UPDATE_SUCCESS, updated, "updated"))
};

exports.deletePayment = async (req, res) => {
    const { id } = req.params;
    await paymentService.deletePayment(id);
    res.status(200).json(new ApiResponse(200, Messages.PAYMENT.DELETE_SUCCESS))
};
