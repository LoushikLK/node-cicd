import { NextFunction, Request, Response } from "express";

export default class AwsController {
  /**
   * createUser
   * @param{req,res,next}
   */
  public createUser(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      //handle error
      next(error);
    }
  }
}
