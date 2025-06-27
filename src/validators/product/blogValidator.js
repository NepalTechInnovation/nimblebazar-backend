
const { body, validationResult } = require('express-validator');

exports.validateBlog = [
    body('title').notEmpty().withMessage('Title is required'),
    body('categoryId').notEmpty().withMessage('Category is required'),
    body('description').notEmpty().withMessage('Description is required'),

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
