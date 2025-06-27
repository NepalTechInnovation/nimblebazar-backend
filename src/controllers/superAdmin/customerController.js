const customerService = require('../../services/superAdmin/customerService');
const ApiError = require('../../utils/ApiError');
const ApiResponse = require('../../utils/ApiResponse');
const Messages = require('../../constants/messages');

exports.fetchAllCustomer = async (req, res, next) => {
    try {
        const data = await customerService.fetchAllCustomer(req, res);
        res.status(200).json(new ApiResponse(200, Messages.CUSTOMER.FETCH_SUCCESS, data, "data"))
    } catch (error) {
        next(error);
    }
};

exports.searchCustomer = async (req, res, next) => {
    try {
        const query = req.query.name || '';
        const customers = await customerService.searchCustomer(query, req);
        res.status(200).json(new ApiResponse(200, Messages.CUSTOMER.FETCH_SUCCESS, customers, "customers"))
    } catch (error) {
        next(error);
    }
};

exports.deleteCustomer = async (req, res, next) => {
  const { customerId } = req.body;
  try {
    await customerService.deleteCustomer(customerId);
    res.status(200).json(new ApiResponse(200, Messages.CUSTOMER.DELETE_SUCCESS))
  } catch (error) {
    next(error);
  }
};

exports.updateCustomer = async (req, res, next) => {
  const customerId = req.params.customerId;
  try {
    await customerService.updateCustomer(req, res,customerId);
    res.status(200).json(new ApiResponse(200, Messages.CUSTOMER.DELETE_SUCCESS))
  } catch (error) {
    next(error);
  }
};
