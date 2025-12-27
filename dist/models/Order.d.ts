import mongoose, { Document } from 'mongoose';
import { IOrder } from '../types';
export interface IOrderDocument extends Omit<IOrder, '_id'>, Document {
}
declare const _default: mongoose.Model<IOrderDocument, {}, {}, {}, mongoose.Document<unknown, {}, IOrderDocument> & IOrderDocument & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default _default;
//# sourceMappingURL=Order.d.ts.map