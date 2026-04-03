"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateStateName = exports.validateMongoId = exports.validateState = exports.validateReview = exports.validateProduct = exports.handleValidationErrors = void 0;
const express_validator_1 = require("express-validator");
const errorHandler_1 = require("./errorHandler");
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return next(new errorHandler_1.AppError(errorMessages.join(", "), 400));
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
exports.validateProduct = [
    (0, express_validator_1.body)("name")
        .trim()
        .notEmpty()
        .withMessage("Product name is required")
        .isLength({ min: 3, max: 100 })
        .withMessage("Product name must be between 3 and 100 characters"),
    (0, express_validator_1.body)("price")
        .notEmpty()
        .withMessage("Price is required")
        .isNumeric()
        .withMessage("Price must be a valid number")
        .isFloat({ min: 0 })
        .withMessage("Price must be a positive number"),
    (0, express_validator_1.body)("category")
        .trim()
        .notEmpty()
        .withMessage("Category is required")
        .isLength({ min: 2, max: 50 })
        .withMessage("Category must be between 2 and 50 characters"),
    (0, express_validator_1.body)("description")
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage("Description must not exceed 500 characters"),
    (0, express_validator_1.body)("material")
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage("Material must not exceed 100 characters"),
    (0, express_validator_1.body)("craftsmanship")
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage("Craftsmanship must not exceed 100 characters"),
    (0, express_validator_1.body)("imageUrl")
        .optional()
        .isURL()
        .withMessage("Image URL must be a valid URL"),
    (0, express_validator_1.body)("quantity")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Quantity must be a non-negative integer"),
    (0, express_validator_1.body)("artisanId")
        .optional()
        .trim()
        .isLength({ min: 3 })
        .withMessage("Artisan ID must be at least 3 characters"),
    exports.handleValidationErrors
];
exports.validateReview = [
    (0, express_validator_1.body)("user")
        .trim()
        .notEmpty()
        .withMessage("User name is required")
        .isLength({ min: 2, max: 50 })
        .withMessage("User name must be between 2 and 50 characters"),
    (0, express_validator_1.body)("comment")
        .trim()
        .notEmpty()
        .withMessage("Comment is required")
        .isLength({ min: 10, max: 500 })
        .withMessage("Comment must be between 10 and 500 characters"),
    (0, express_validator_1.body)("rating")
        .isInt({ min: 1, max: 5 })
        .withMessage("Rating must be an integer between 1 and 5"),
    exports.handleValidationErrors
];
exports.validateState = [
    (0, express_validator_1.body)("stateID")
        .trim()
        .notEmpty()
        .withMessage("State ID is required")
        .isLength({ min: 2, max: 10 })
        .withMessage("State ID must be between 2 and 10 characters"),
    (0, express_validator_1.body)("stateName")
        .trim()
        .notEmpty()
        .withMessage("State name is required")
        .isLength({ min: 3, max: 100 })
        .withMessage("State name must be between 3 and 100 characters"),
    (0, express_validator_1.body)("stateDesc")
        .trim()
        .notEmpty()
        .withMessage("State description is required")
        .isLength({ min: 10, max: 1000 })
        .withMessage("State description must be between 10 and 1000 characters"),
    (0, express_validator_1.body)("ImagesData")
        .isArray()
        .withMessage("Images data must be an array"),
    (0, express_validator_1.body)("ImagesData.*.cardImage")
        .isURL()
        .withMessage("Card image must be a valid URL"),
    (0, express_validator_1.body)("ImagesData.*.bgImage")
        .isURL()
        .withMessage("Background image must be a valid URL"),
    (0, express_validator_1.body)("ImagesData.*.cardTitle")
        .trim()
        .notEmpty()
        .withMessage("Card title is required")
        .isLength({ min: 2, max: 50 })
        .withMessage("Card title must be between 2 and 50 characters"),
    exports.handleValidationErrors
];
exports.validateMongoId = [
    (0, express_validator_1.param)("id")
        .isMongoId()
        .withMessage("Invalid ID format"),
    exports.handleValidationErrors
];
exports.validateStateName = [
    (0, express_validator_1.param)("stateName")
        .trim()
        .notEmpty()
        .withMessage("State name is required")
        .isLength({ min: 2, max: 50 })
        .withMessage("State name must be between 2 and 50 characters"),
    exports.handleValidationErrors
];
//# sourceMappingURL=validation.js.map