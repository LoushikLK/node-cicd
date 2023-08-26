import { NextFunction, Request, Response } from "express";
import { BuildModel } from "../../schemas/build";
import HookService from "./services";

export default class HookController {
  private service: HookService;
  constructor() {
    this.service = new HookService();
  }

  /**
   * handleHooks
   *
   */

  public async handleHooks(req: Request, res: Response, next: NextFunction) {
    try {
      await BuildModel.create({
        metadata: req,
      });

      //send response to client
      res.json({
        msg: "Success",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
}
