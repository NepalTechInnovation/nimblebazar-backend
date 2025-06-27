const express = require('express');
const router = express.Router();
const shippingAddressController = require('../../controllers/shippingAddress/shippingAddressController');
const { authorizeRoles, authorize } = require('../../middleware/authorize');
const Roles = require("../../constants/roleEnum")
router.post('/create-shipping-address', authorize, authorizeRoles(Roles.CUSTOMER), shippingAddressController.create);
router.get('/fetch-shipping-address-by-id/:id', authorize, authorizeRoles(Roles.CUSTOMER), shippingAddressController.getById);
router.get('/fetch-all-shipping-addresses', authorize, authorizeRoles(Roles.CUSTOMER), shippingAddressController.getAllByUser);
router.put('/update-shipping-address/:id', authorize, authorizeRoles(Roles.CUSTOMER), shippingAddressController.update);
router.patch('/delete-shipping-address/:id', authorize, authorizeRoles(Roles.CUSTOMER), shippingAddressController.remove);

module.exports = router;
