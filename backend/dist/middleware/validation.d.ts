import { Request, Response, NextFunction } from "express";
export declare const handleValidationErrors: (req: Request, res: Response, next: NextFunction) => void;
export declare const validateProduct: (((req: Request, res: Response, next: NextFunction) => void) | import("express-validator").ValidationChain)[];
export declare const validateReview: (((req: Request, res: Response, next: NextFunction) => void) | import("express-validator").ValidationChain)[];
export declare const validateState: (((req: Request, res: Response, next: NextFunction) => void) | import("express-validator").ValidationChain)[];
export declare const validateMongoId: (((req: Request, res: Response, next: NextFunction) => void) | import("express-validator").ValidationChain)[];
export declare const validateStateName: (((req: Request, res: Response, next: NextFunction) => void) | import("express-validator").ValidationChain)[];
//# sourceMappingURL=validation.d.ts.map