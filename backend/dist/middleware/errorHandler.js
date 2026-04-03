"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = exports.notFound = exports.errorHandler = exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
const errorHandler = (err, req, res, next) => {
    const { statusCode = 500, message } = err;
    console.error("Error:", {
        message,
        stack: err.stack,
        url: req.url,
        method: req.method,
        body: req.body,
        params: req.params,
        query: req.query
    });
    res.status(statusCode).json({
        success: false,
        error: message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    });
};
exports.errorHandler = errorHandler;
const notFound = (req, res, next) => {
    const error = new AppError(`Not found - ${req.originalUrl}`, 404);
    next(error);
};
exports.notFound = notFound;
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
exports.asyncHandler = asyncHandler;
//# sourceMappingURL=errorHandler.js.map