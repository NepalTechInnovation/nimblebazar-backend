const express = require('express');
const router = express.Router();
const paymentController = require('../../controllers/payment/paymentController');
const { authorizeRoles, authorize } = require('../../middleware/authorize');
const Roles=require("../../constants/roleEnum")
router.post('/create-payment',authorize, authorizeRoles(Roles.CUSTOMER), paymentController.createPayment);
router.get('/fetch-all-payment',authorize, authorizeRoles(Roles.CUSTOMER), paymentController.getAllPayments);
router.get('/fetch-payment-by-id/:id' ,authorize, authorizeRoles(Roles.CUSTOMER),paymentController.getPaymentById);
router.patch('/update-payment/:id/status',authorize, authorizeRoles(Roles.CUSTOMER), paymentController.updatePayment);
router.delete('/delete-payment/:id',authorize, authorizeRoles(Roles.CUSTOMER),paymentController.deletePayment);

module.exports = router;
