import mongoose, { Document } from "mongoose";
export interface IImageData {
    cardImage: string;
    bgImage: string;
    cardTitle: string;
}
export interface IDetailImage {
    detailImage: string;
    detailImageDescription: string;
}
export interface IDetail {
    detailTitle: string;
    detailDescription: string[];
    detailAdditionalInfo: string;
    detailImages: IDetailImage[];
}
export interface IState extends Document {
    stateID: string;
    stateName: string;
    stateDesc: string;
    ImagesData: IImageData[];
    detail: IDetail[];
    createdAt: Date;
    updatedAt: Date;
}
declare const State: mongoose.Model<IState, {}, {}, {}, mongoose.Document<unknown, {}, IState> & IState & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default State;
//# sourceMappingURL=state.d.ts.map