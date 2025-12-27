import { Response } from 'express';
import { AuthRequest } from '../types';
export declare const getCategories: (_req: AuthRequest, res: Response) => Promise<void>;
export declare const getCategory: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getCategoryBySlug: (req: AuthRequest, res: Response) => Promise<void>;
export declare const createCategory: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateCategory: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deleteCategory: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=categoryController.d.ts.map