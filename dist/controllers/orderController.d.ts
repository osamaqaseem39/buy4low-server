import { Response } from 'express';
import { AuthRequest } from '../types';
export declare const createOrder: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getMyOrders: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getOrders: (_req: AuthRequest, res: Response) => Promise<void>;
export declare const getOrder: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateOrderStatus: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=orderController.d.ts.map