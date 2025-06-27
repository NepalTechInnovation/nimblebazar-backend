const superAdminService = require('../../services/superAdmin/superAdminService');
const productService = require('../../services/superAdmin/productService');
const orderService = require('../../services/superAdmin/orderService');
const ApiError = require('../../utils/ApiError');
const ApiResponse = require('../../utils/ApiResponse');
const Messages = require('../../constants/messages');



exports.fetchAllOrders = async (req, res) => {
  try {
    const orders = await superAdminService.fetchAllOrders(req, res);
    res.status(200).json(new ApiResponse(200, Messages.ORDER.FETCH_SUCCESS, orders, "orders"))
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};






exports.updateCustomer = async (req, res, next) => {
  try {
    const customerId = req.params.customerId;
    await superAdminService.updateCustomer(req, res, customerId);
    res.status(200).json(new ApiResponse(200, Messages.CUSTOMER.UPDATE_SUCCESS,))
  } catch (error) {
    next(error);
  }
};

exports.fetchAllProducts = async (req, res) => {
  try {
    const data = await productService.fetchAllProducts(req);
    res.status(200).json(new ApiResponse(200, Messages.PRODUCT.FETCH_SUCCESS, data, "data"))
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.searchProduct = async (req, res, next) => {
  try {
    const query = req.query.name || '';
    const products = await productService.searchProduct(query);
    res.status(200).json(new ApiResponse(200, Messages.PRODUCT.FETCH_SUCCESS, products, "products"))
  } catch (error) {
    next(error);
  }
};
// exports.fetchAllOrders = async (req, res, next) => {
//   try {

//     const orders = await orderService.fetchAllOrders();
//     res.status(200).json(new ApiResponse(200, Messages.ORDER.FETCH_SUCCESS, orders, "orders"))
//   } catch (error) {
//     next(error);
//   }
// };

exports.searchOrder = async (req, res, next) => {
  try {
    const query = req.query.orderId || '';
    const orders = await orderService.searchOrder(query);
    res.status(200).json(new ApiResponse(200, Messages.ORDER.FETCH_SUCCESS, orders, "orders"))
  } catch (error) {
    next(error);
  }
};