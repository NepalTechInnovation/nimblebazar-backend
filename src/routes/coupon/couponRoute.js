const express = require("express");
const router = express.Router();

const couponController = require("../../controllers/coupon/couponController");
const { authorizeRoles, authorize } = require('../../middleware/authorize');
const Roles = require("../../constants/roleEnum");
router.post("/create-coupon", authorize, authorizeRoles(Roles.SUPER_ADMIN), couponController.createCoupon);
router.put("/update-coupon/:id", authorize, authorizeRoles(Roles.SUPER_ADMIN), couponController.updateCoupon);
router.delete("/delete-coupon/:id", authorize, authorizeRoles(Roles.SUPER_ADMIN), couponController.deleteCoupon);
router.get("/fetch-all-coupons", authorize, authorizeRoles(Roles.SUPER_ADMIN), couponController.getAllCoupons);
router.post("/validate-coupon", authorize, authorizeRoles(Roles.CUSTOMER), couponController.validateCoupon);
router.get("/fetch-coupon-by-id/:id", authorize, authorizeRoles(Roles.SUPER_ADMIN), couponController.fetchCouponById);
module.exports = router;