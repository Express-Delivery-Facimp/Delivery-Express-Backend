import { NextFunction, Request, Response } from "express";

export const asyncHandler =
  (fn: (Req: Request, Res: Response, next: NextFunction) => Promise<unknown>) =>
  (Req: Request, Res: Response, next: NextFunction) => {
    Promise.resolve(fn(Req, Res, next)).catch(next);
  };
