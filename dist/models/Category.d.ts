import mongoose, { Document } from 'mongoose';
import { ICategory } from '../types';
export interface ICategoryDocument extends Omit<ICategory, '_id'>, Document {
}
declare const _default: mongoose.Model<ICategoryDocument, {}, {}, {}, mongoose.Document<unknown, {}, ICategoryDocument> & ICategoryDocument & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default _default;
//# sourceMappingURL=Category.d.ts.map