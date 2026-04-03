"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const razorpay_1 = __importDefault(require("razorpay"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const razorpay = new razorpay_1.default({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_XXXXXXXXXXXXXXXXXXXX',
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'your_test_secret_here'
});
class RazorpayService {
    async createOrder(orderData) {
        try {
            const order = await razorpay.orders.create({
                amount: orderData.amount * 100,
                currency: orderData.currency || 'INR',
                receipt: orderData.receipt,
                notes: orderData.notes || {},
                payment_capture: true
            });
            return order;
        }
        catch (error) {
            console.error('Razorpay order creation error:', error);
            throw new Error('Failed to create payment order');
        }
    }
    async verifyPayment(paymentId, orderId, signature) {
        try {
            const crypto = require('crypto');
            const secret = process.env.RAZORPAY_KEY_SECRET || 'your_test_secret_here';
            const generatedSignature = crypto
                .createHmac('sha256', secret)
                .update(`${orderId}|${paymentId}`)
                .digest('hex');
            return generatedSignature === signature;
        }
        catch (error) {
            console.error('Payment verification error:', error);
            return false;
        }
    }
    async fetchPayment(paymentId) {
        try {
            const payment = await razorpay.payments.fetch(paymentId);
            return payment;
        }
        catch (error) {
            console.error('Fetch payment error:', error);
            throw new Error('Failed to fetch payment details');
        }
    }
    getTestCredentials() {
        return {
            keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_XXXXXXXXXXXXXXXXXXXX',
            message: 'Using test credentials - no actual charges will be made'
        };
    }
}
exports.default = new RazorpayService();
//# sourceMappingURL=razorpayService.js.map