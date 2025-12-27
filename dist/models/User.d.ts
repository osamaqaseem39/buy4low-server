import mongoose, { Document } from 'mongoose';
import { IUser } from '../types';
export interface IUserDocument extends Omit<IUser, '_id'>, Document {
    matchPassword(enteredPassword: string): Promise<boolean>;
}
declare const _default: mongoose.Model<IUserDocument, {}, {}, {}, mongoose.Document<unknown, {}, IUserDocument> & IUserDocument & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default _default;
//# sourceMappingURL=User.d.ts.map