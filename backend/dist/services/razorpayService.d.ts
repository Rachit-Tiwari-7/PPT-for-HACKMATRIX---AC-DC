export interface PaymentOrder {
    amount: number;
    currency: string;
    receipt: string;
    notes?: Record<string, any>;
}
export interface PaymentResponse {
    id: string;
    entity: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    currency: string;
    receipt: string;
    status: string;
    attempts: number;
    notes: Record<string, any>;
    created_at: number;
}
declare class RazorpayService {
    createOrder(orderData: PaymentOrder): Promise<PaymentResponse>;
    verifyPayment(paymentId: string, orderId: string, signature: string): Promise<boolean>;
    fetchPayment(paymentId: string): Promise<any>;
    getTestCredentials(): {
        keyId: string;
        message: string;
    };
}
declare const _default: RazorpayService;
export default _default;
//# sourceMappingURL=razorpayService.d.ts.map