const orderService = require('../../services/order/orderService');
const ApiError = require('../../utils/ApiError');
const ApiResponse = require('../../utils/ApiResponse');
const asyncWrapper = require("../../middleware/asyncWrapper");
const Messages = require('../../constants/messages');
exports.createOrder = async (req, res) => {
    try {
        const order = await orderService.createOrder(req.body, req.user.id);
        res
            .status(200)
            .json(new ApiResponse(200, Messages.ORDER.CREATE_SUCCESS, order));
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create order' });
    }
};


exports.getOrderById = async (req, res) => {
    const { id } = req.params;
    const order = await orderService.getOrderById(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(new ApiResponse(200, Messages.ORDER.FETCH_SUCCESS, order, "order"))
};

exports.updateOrderStatus = async (req, res) => {
    const { id } = req.params;
   
    const updated = await orderService.updateOrderStatus(id, req);
    res.status(200).json(new ApiResponse(200, Messages.ORDER.UPDATE_SUCCESS, updated, "updated"))
};

exports.deleteOrder = async (req, res) => {
    const { id } = req.params;
    await orderService.deleteOrder(id);
    res.status(200).json(new ApiResponse(200, Messages.ORDER.DELETE_SUCCESS))
};

exports.fetchUserOrder = async (req, res) => {
    const order = await orderService.fetchUserOrder(req, res);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(new ApiResponse(200, Messages.ORDER.FETCH_SUCCESS, order, "order"))
};