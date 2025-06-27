const { body, validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');

exports.registerValidator = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),

  body('email')
    .isEmail()
    .withMessage('Please provide a valid email'),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

      const message = errors.array().map(err => err.msg).join(', ');

      throw new ApiError(400, message);
    }
    next();
  }
];

exports.loginValidator = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email'),

  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];