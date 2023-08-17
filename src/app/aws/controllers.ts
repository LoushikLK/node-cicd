import { NextFunction, Request, Response } from "express";
import AwsServices from "./services";

export default class AwsController {
  private service: AwsServices;
  constructor() {
    this.service = new AwsServices();
  }

  /**
   * createUser
   *
   */
  public async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        instanceId,
        username,
        privateKey,
        awsRegion,
        isDefault,
        publicIp,
      } = req.body;
      //get data from req.body
      const awsAccountId = await this.service.createAwsService({
        instanceId,
        username,
        privateKey,
        awsRegion,
        isDefault,
        publicIp,
        userId: req?.currentUser?._id,
      });

      //send response to client
      res.json({
        msg: "AWS account created",
        success: true,
        data: {
          data: awsAccountId,
        },
      });
    } catch (error) {
      //handle error
      next(error);
    }
  }
}
