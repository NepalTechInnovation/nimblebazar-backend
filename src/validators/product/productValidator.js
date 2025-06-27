
const { body, validationResult } = require('express-validator');

exports.validateProduct = [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('price')
        .isFloat({ gt: 0 })
        .withMessage('Price must be a positive number'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                success: false,
                errors: errors.array(),
            });
        }
        next();
    },
];

exports.validateProductId = [
    body('productId')
        .isEmail()
        .withMessage('Product Id is required'),
];

exports.validateProductCategory = [
    body('name').notEmpty().withMessage('Name is required'),
];