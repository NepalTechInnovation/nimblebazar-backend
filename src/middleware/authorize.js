require("dotenv").config();
const API_SECRET = process.env.API_SECRET;
const { hasRole, ROLES } = require('../utils/roleUtils');
const ApiError = require('../utils/ApiError');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
exports.authorize = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return next(new ApiError(401, "API key is missing or invalid"));
    }
    const token = authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.API_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include:{
       roles:true
      }
    });

    if (!user) {
      return next(new ApiError(401, 'User not found'));
    }
    req.user = user;
    next();
  } catch (err) {
    return next(new ApiError(401, "Invalid or expired token"));
  }

  // next();
};


exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return next(new ApiError(403, 'User is not authenticated.'));
    }
    const hasRequiredRole = user.roles?.some(r => 
      roles.includes(r.name));

    if (!hasRequiredRole) {
      return next(new ApiError(403, 'You are not authorized to perform this action'));
    }

    next();
  };
};
