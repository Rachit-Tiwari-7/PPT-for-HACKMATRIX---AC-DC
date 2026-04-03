import mongoose, { Document } from "mongoose";
export interface IReview {
    user: string;
    comment: string;
    rating: number;
    date: Date;
}
export interface IProduct extends Document {
    name: string;
    price: number;
    category: string;
    description?: string;
    material?: string;
    craftsmanship?: string;
    imageUrl?: string;
    inStock: boolean;
    quantity: number;
    artisanId?: string;
    dateAdded: Date;
    salesCount: number;
    reviews: IReview[];
    createdAt: Date;
    updatedAt: Date;
}
declare const Product: mongoose.Model<IProduct, {}, {}, {}, mongoose.Document<unknown, {}, IProduct> & IProduct & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default Product;
//# sourceMappingURL=product.d.ts.map