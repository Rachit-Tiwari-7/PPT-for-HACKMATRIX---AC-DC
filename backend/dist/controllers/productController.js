"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProductReview = exports.deleteProduct = exports.getProductsByArtisan = exports.createProduct = exports.getProducts = void 0;
const product_1 = __importDefault(require("../models/product"));
const errorHandler_1 = require("../middleware/errorHandler");
exports.getProducts = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const [products, total] = await Promise.all([
        product_1.default.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
        product_1.default.countDocuments()
    ]);
    res.json({
        data: products,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
            hasNext: page < Math.ceil(total / limit),
            hasPrev: page > 1
        }
    });
});
exports.createProduct = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const newProduct = await product_1.default.create(req.body);
    res.status(201).json({ success: true, data: newProduct });
});
exports.getProductsByArtisan = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { artisanId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const [products, total] = await Promise.all([
        product_1.default.find({ artisanId }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
        product_1.default.countDocuments({ artisanId })
    ]);
    res.json({
        data: products,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
            hasNext: page < Math.ceil(total / limit),
            hasPrev: page > 1
        }
    });
});
exports.deleteProduct = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await product_1.default.findByIdAndDelete(id);
    if (!deletedProduct) {
        res.status(404).json({ success: false, error: "Product not found" });
        return;
    }
    res.json({ success: true, message: "Product deleted successfully" });
});
exports.addProductReview = (0, errorHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    const { user, comment, rating } = req.body;
    const product = await product_1.default.findById(id);
    if (!product) {
        res.status(404).json({ success: false, error: "Product not found" });
        return;
    }
    product.reviews.push({ user, comment, rating, date: new Date() });
    await product.save();
    res.status(201).json({ success: true, data: product.reviews });
});
//# sourceMappingURL=productController.js.map