import mongoose, { Document } from 'mongoose';
import { IBrand } from '../types';
export interface IBrandDocument extends Omit<IBrand, '_id'>, Document {
}
declare const _default: mongoose.Model<IBrandDocument, {}, {}, {}, mongoose.Document<unknown, {}, IBrandDocument> & IBrandDocument & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default _default;
//# sourceMappingURL=Brand.d.ts.map