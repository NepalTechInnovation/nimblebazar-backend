const express = require('express');
const router = express.Router();

const superAdminController = require('../../controllers/superAdmin/superAdminController');
const customerController = require('../../controllers/superAdmin/customerController');
const bannerController = require('../../controllers/banner/bannerController');
const { authorizeRoles, authorize } = require('../../middleware/authorize');
const Roles = require('../../constants/roleEnum');
// router.get('/fetch-dashboard-summary', authorize, authorizeRoles('SUPERADMIN'), analyticsController.fetchDashboardSummary);
// router.get('/fetch-all-orders', authorize, authorizeRoles('SUPERADMIN'), superAdminController.fetchAllOrders);
// router.get('/fetch-monthly-metrics', authorize, authorizeRoles('SUPERADMIN'), analyticsController.fetchMonthlyMetrics);
// router.put('/update-customer/:customerId', authorize, authorizeRoles('SUPERADMIN'), superAdminController.updateCustomer);
router.get('/fetch-all-customer', authorize, authorizeRoles('SUPERADMIN'), customerController.fetchAllCustomer);
router.get('/search-customer', authorize, authorizeRoles('SUPERADMIN'), customerController.searchCustomer);
router.get('/fetch-all-products', authorize, authorizeRoles('SUPERADMIN'), superAdminController.fetchAllProducts);
router.get('/search-products', authorize, authorizeRoles('SUPERADMIN'), superAdminController.searchProduct);
router.get('/fetch-all-orders', authorize, authorizeRoles('SUPERADMIN'), superAdminController.fetchAllOrders);
router.get('/search-orders', authorize, authorizeRoles('SUPERADMIN'), superAdminController.searchOrder);
router.get("/fetch-all-banner", authorize, authorizeRoles(Roles.SUPER_ADMIN), bannerController.fetchAllBanner);

module.exports = router;