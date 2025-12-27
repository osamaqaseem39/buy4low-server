import mongoose, { Document } from 'mongoose';
import { IProduct } from '../types';
export interface IProductDocument extends Omit<IProduct, '_id'>, Document {
}
declare const _default: mongoose.Model<IProductDocument, {}, {}, {}, mongoose.Document<unknown, {}, IProductDocument> & IProductDocument & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default _default;
//# sourceMappingURL=Product.d.ts.map