import { Request } from 'express';
import { IUserDocument } from '../models/User';
export interface IUser {
    _id?: string | any;
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    createdAt?: Date;
    updatedAt?: Date;
}
export interface IProduct {
    _id?: string | any;
    name: string;
    description: string;
    shortDescription?: string;
    price: number;
    compareAtPrice?: number;
    sku: string;
    category: string;
    subcategory?: string;
    brand?: string;
    images: string[];
    thumbnail?: string;
    stock: number;
    isActive: boolean;
    isAffiliate: boolean;
    affiliateLink?: string;
    tags?: string[];
    specifications?: Record<string, string>;
    rating?: number;
    reviewCount?: number;
    shippingWeight?: number;
    dimensions?: {
        length: number;
        width: number;
        height: number;
        unit: 'cm' | 'inch';
    };
    createdAt?: Date;
    updatedAt?: Date;
}
export interface ICategory {
    _id?: string | any;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    parent?: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface IBrand {
    _id?: string | any;
    name: string;
    slug: string;
    description?: string;
    logo?: string;
    website?: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface IOrder {
    _id?: string | any;
    user: string;
    items: {
        product: string;
        name: string;
        price: number;
        quantity: number;
        image: string;
    }[];
    totalAmount: number;
    shippingAddress: {
        fullName: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        phone: string;
    };
    paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
    orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    paymentMethod: string;
    transactionId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface AuthRequest extends Request {
    user?: IUserDocument | null;
}
//# sourceMappingURL=index.d.ts.map