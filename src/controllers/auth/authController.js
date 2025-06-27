const db = require('../../config/db');
const bcrypt = require('bcrypt');
const authService = require('../../services/auth/authService');
const asyncWrapper = require("../../middleware/asyncWrapper");
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ApiError = require('../../utils/ApiError');
const ApiResponse = require('../../utils/ApiResponse');
const Messages = require('../../constants/messages');
const { hashPassword } = require('../../utils/passwordUtils');
const { verifyOTP } = require('../../services/email/otpService');

const register = asyncWrapper(async (req, res, next) => {
    // try {
    const { email, password, name, } = req.body;
    const { user, token } = await authService.register(email, password, name,);
    res.status(200).json(new ApiResponse("200", Messages.OTP.SUCCESS, {
        id: user.id,
        email: user.email,
        name: user.name,
        roles: user.roles,
        token
    }));
    // } catch (error) {
    //     next(error);
    // }
});

const login = asyncWrapper(async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.login(email, password);

        res.status(200).json(
            new ApiResponse("200", Messages.AUTH.LOGIN_SUCCESS, {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.roles,
                token: token,
            })
        );

    } catch (error) {
        next(error);
    }
});

const getAllUsers = async (req, res) => {
    try {
        const { limit = 10, page = 1 } = req.query;

        const offset = (page - 1) * limit;
        const users = await db.user.findMany({ skip: offset, take: limit });

        res.status(200).json({ success: true, users });
    } catch (err) {
        console.log("Error getting users:", err);
        res.status(500).json({ success: false, error: "Error getting users" });
    }
};

const updateUserDetails = asyncWrapper(async (req, res, next) => {
    try {

        const updateUser = await authService.updateUserDetails(req, req.user.id);

        res.status(200).json(
            new ApiResponse("200", Messages.AUTH.PROFILE_UPDATED, {
                id: updateUser.id,
                email: updateUser.email,
                name: updateUser.name,
                avatar: updateUser.avatar

            })
        );

    } catch (error) {
        throw new ApiError(400, error);
    }
});

const changePassword = async (req, res) => {
    try {
        const { id, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await db.user.update({
            where: { id },
            data: { password: hashedPassword }
        });

        res.status(200).json({ success: true, user });
    } catch (err) {
        console.log("Error updating password:", err);
        res.status(500).json({ success: false, error: "Error updating password" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.body;

        await db.user.delete({ where: { id } });

        res.status(200).json({ success: true });
    } catch (err) {
        console.log("Error deleting user:", err);
        res.status(500).json({ success: false, error: "Error deleting user" });
    }
};

const getUserDetails = async (req, res) => {
    // try {
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, error: "Unauthorized" });
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.API_SECRET);
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            // select: {
            //     id: true,
            //     name: true,
            //     email: true,
            //     avatar:true
            // },
            include:{
                roles:true
            }
        });
        if (!user) {
            return res.status(400).json({ success: false, error: "Unauthorized" });
        }

        res.status(200).json(
            new ApiResponse("200", Messages.AUTH.FETCH_PROFILE, {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.roles,
                token: token,
            })
        );
    // } catch (err) {
    //     res.status(500).json({ success: false, error: "Error getting user" });
    // }
};

const googleCallback = asyncWrapper(async (req, res, next) => {
    try {
        const { token } = req.user;
        res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
    } catch (err) {
        res.status(500).json({ message: "Authentication failed", error: err.message });
    }
});

const verifyEmailOtp = asyncWrapper(async (req, res) => {
    // try {
    const { user, token } = await authService.verifyEmailOtp(req, res);
    res.status(200).json(new ApiResponse(200, Messages.OTP.VERIFIED, {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        token,
    }));
    // } catch (err) {
    //     throw new ApiError(500, Messages.GENERAL.SOMETHING_WENT_WRONG);
    // }
});

const resendEmailVerifyOTP = asyncWrapper(async (req, res) => {
    try {
        const { email } = req.params;
        await authService.reSendOtp(email);
        res.status(200).json(new ApiResponse(200, Messages.OTP.SUCCESS,));
    } catch (err) {
        throw new ApiError(500, Messages.GENERAL.SOMETHING_WENT_WRONG);
    }
});

const resetPassword = async (req, res) => {
    const { email, newPassword, otp } = req.body;
    const isValid = verifyOTP(email, otp);
    if (!isValid) throw new ApiError(500, Messages.OTP.INVALID_OR_EXPRIED);
    else {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new ApiError(500, 'User not found');
        }

        const hashedPassword = await hashPassword(newPassword);

        await prisma.user.update({
            where: { email },
            data: {
                password: hashedPassword,
            },
        });

        res.json({ message: 'Password reset successful' });
    }

};

const verifyForgotPasswordOtp = asyncWrapper(async (req, res) => {
    // try {
    const { updatedUser, token } = await authService.verifyForgotPasswordOtp(req, res);
    res.status(200).json(new ApiResponse(200, Messages.PASSWORD.SUCCESS, {
        email: updatedUser.email,
        token,
    }));
    // } catch (err) {
    //     throw new ApiError(500, Messages.GENERAL.SOMETHING_WENT_WRONG);
    // }
});

const forgotPasswordEmailOtp = asyncWrapper(async (req, res) => {
    // try {
    const { email } = req.params;
    await authService.forgotPasswordOTP(email);
    res.status(200).json(new ApiResponse(200, Messages.OTP.SUCCESS));
    // } catch (err) {
    //     throw new ApiError(500, Messages.GENERAL.SOMETHING_WENT_WRONG);
    // }
});
module.exports = {
    login,
    register,
    getAllUsers,
    updateUserDetails,
    changePassword,
    deleteUser,
    getUserDetails,
    googleCallback,
    verifyEmailOtp,
    resendEmailVerifyOTP,
    verifyForgotPasswordOtp,
    resetPassword,
    forgotPasswordEmailOtp
};