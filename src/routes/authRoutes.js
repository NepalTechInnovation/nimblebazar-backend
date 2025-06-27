const express = require('express');
const router = express.Router();
const passport = require("passport");
const { registerValidator, loginValidator } = require('../validators/authValidator');
const { validate } = require('../middleware/validateMiddleware');
// Import controllers
const authController = require('../controllers/auth/authController');
const { authorize, authorizeRoles } = require('../middleware/authorize');
const Roles = require('../constants/roleEnum');
// User routes
router.get('/fetch-all-users', authorize,  validate,authorizeRoles(Roles.SUPER_ADMIN), authController.getAllUsers);
router.post('/login', loginValidator, authController.login);
router.post('/register', registerValidator, authController.register,);
router.patch('/update-user-details', authorize, authController.updateUserDetails);
router.patch('/change-password', authorize, authController.changePassword);
router.delete('/delete', authorize, authController.deleteUser);
router.get('/user-details', authorize, authController.getUserDetails);

//google auth
router.get("/google", (req, res, next) => {
    passport.authenticate("google", {
        scope: ["profile", "email"],
        session: false,
    })(req, res, next);
});
router.get("/google/callback", passport.authenticate("google", { session: false }), authController.googleCallback);

//otp
router.post('/verify-email-otp', validate, authController.verifyEmailOtp);
router.get('/resend-verify-email-otp/:email', authController.resendEmailVerifyOTP);
router.get('/forget-password-email-otp/:email', authController.forgotPasswordEmailOtp);
router.patch('/verify-forgot-password-otp', authController.verifyForgotPasswordOtp);
router.patch('/reset-password', validate, authController.resetPassword);
module.exports = router;