import { NextFunction, Request, Response } from "express";
import { Unauthorized } from "http-errors";
import { verifyToken } from "../helpers/jwt.helper";
import { AuthorizedUser } from "../types";

declare global {
  namespace Express {
    interface Request {
      currentUser: AuthorizedUser;
    }
  }
}

export default class AuthService {
  /**
   * isAuthenticated middleware
   */
  public async isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.headers.authorization)
        throw new Unauthorized("User is not authorized.");

      // extract token from header
      const decoded = await verifyToken(req.headers.authorization);
      req.currentUser = {
        _id: decoded?._id,
        email: decoded?.email,
        role: decoded?.role,
        clientServiceId: decoded?.clientServiceId,
        clientServiceRole: decoded?.clientServiceRole,
      };
      next();
    } catch (error) {
      const err = error as Error;
      res.status(401).json({
        success: false,
        msg: err.message,
      });
    }
  }
}
