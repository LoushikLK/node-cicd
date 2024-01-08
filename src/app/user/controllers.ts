import { NextFunction, Request, Response } from "express";
import UserService from "./services";

export default class UserController {
  private service: UserService;
  constructor() {
    this.service = new UserService();
  }

  /**
   * getSelf
   *
   */

  public async getSelf(req: Request, res: Response, next: NextFunction) {
    try {
      // handle hooks for different event
      const data = await this.service.handleSelfData(req?.currentUser?._id);

      //send response to client
      res.json({
        msg: "Success",
        success: true,
        data: { data },
      });
    } catch (error) {
      next(error);
    }
  }
}
