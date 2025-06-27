const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/order/orderController');
const { authorizeRoles, authorize } = require('../../middleware/authorize');
const Roles = require("../../constants/roleEnum")
router.post('/create-order', authorize, authorizeRoles(Roles.CUSTOMER), orderController.createOrder);
router.get('/fetch-order-by-id/:id', authorize, authorizeRoles(Roles.SUPER_ADMIN,Roles.CUSTOMER), orderController.getOrderById);
router.patch('/update-order/:id', authorize, authorizeRoles(Roles.SUPER_ADMIN), orderController.updateOrderStatus);
router.patch('/delete-order/:id', authorize, authorizeRoles(Roles.SUPER_ADMIN), orderController.deleteOrder);
router.get('/fetch-user-order', authorize, authorizeRoles(Roles.CUSTOMER), orderController.fetchUserOrder);
module.exports = router;
