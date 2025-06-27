const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { hashPassword, comparePassword } = require('../../utils/passwordUtils');
const { generateToken } = require('../../utils/jwtUtils');
const ApiError = require('../../utils/ApiError');
const passport = require("passport");
const Roles = require('../../constants/roleEnum');
const { sendTemplatedEmail } = require('../../utils/emailSender');
const Messages = require('../../constants/messages');
const { generateOTP, saveOTP, otpStore, verifyOTP } = require('../email/otpService');
exports.register = async (email, password, name) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new ApiError(400, 'Email is already in use');
  }
  const role = await prisma.role.findFirst({
    where: {
      name: {
        equals: "CUSTOMER",
      }
    }
  });
  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
      name: name,
      roles: {
        connect: [{ id: role.id }],
      },
    },
    include: {
      roles: true,
    },
  });
  sendOtp(email);
  const token = generateToken(user);
  return { user, token };
};

exports.login = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email }, include: {
      roles: true
    }
  });

  if (!user) {
    throw new ApiError(400, 'Invalid credentials');
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new ApiError(400, 'Invalid credentials');
  }

  const token = generateToken(user);

  return { user, token };
};

exports.updateUserDetails = async (req, userId) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const { name, avatar } = req.body;

    const updateUser = await prisma.user.update({
      where: { id: userId },
      data: { name: name, avatar: avatar, }
    });

    return updateUser;
  } catch (err) {

    throw new ApiError(400, 'Something went wrong');
  }
};


exports.findOrCreateGoogleUser = async (profile) => {
  let user = await prisma.user.findUnique({
    where: { googleId: profile.id }
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        name: profile.displayName,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
        role: Roles.CUSTOMER,
        googleId: profile.id,
        isEmailVerified: true
      }
    });
  }

  const token = generateToken(user);

  return { user, token };
};


async function sendOtp(email) {
  // try {
  if (!email) throw new ApiError(500, Messages.OTP.EMAIL_ERROR);

  const otp = generateOTP();
  saveOTP(email, otp);

  await sendTemplatedEmail(email, 'Your OTP Code', "verify-code", {
    username: email,
    otp: otp,
  });
  // } catch (error) {
  //   console.error('OTP Error:', error); 
  //   throw new ApiError(500, Messages.OTP.FAILED);
  // }
}

exports.verifyEmailOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) throw new ApiError(500, 'Email and OTP are required');

  const isValid = verifyOTP(email, otp);
  if (!isValid) throw new ApiError(500, Messages.OTP.INVALID_OR_EXPRIED);


  const user = await prisma.user.update({
    where: { email },
    data: { isEmailVerified: true },
  });
  const token = generateToken(user);
  return { user, token };
}
exports.reSendOtp = async (email) => {
  try {
    if (!email) throw new ApiError(500, Messages.OTP.EMAIL_ERROR);

    const otp = generateOTP();
    saveOTP(email, otp);

    await sendTemplatedEmail(email, 'Your OTP Code', "verify-code", {
      username: email,
      otp: otp,
    });
  } catch (error) {
    throw new ApiError(500, Messages.OTP.FAILED);
  }
}


exports.verifyForgotPasswordOtp = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp) throw new ApiError(500, 'Email and OTP are required');
  const isValid = verifyOTP(email, otp);
  if (!isValid) throw new ApiError(500, Messages.OTP.INVALID_OR_EXPRIED);

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new ApiError(500, 'User not found');
  }

  const hashedPassword = await hashPassword(newPassword);

  const updatedUser = await prisma.user.update({
    where: { email },
    data: {
      password: hashedPassword,
    },
  });

  const token = generateToken(updatedUser);
  return { updatedUser, token };
}

exports.forgotPasswordOTP = async (email) => {
  try {
    if (!email) throw new ApiError(500, Messages.OTP.EMAIL_ERROR);

    const otp = generateOTP();
    saveOTP(email, otp);
    const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password/${otp}/${email}`;
    await sendTemplatedEmail(email, 'Forgot Password Code', "forgot-password-code", {
      username: email,
      otp: otp,
      resetLink: resetLink
    });
  } catch (error) {
    throw new ApiError(500, Messages.OTP.FAILED);
  }
}
// module.exports = { sendOtp };