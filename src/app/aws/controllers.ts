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
  public async updateUser(req: Request, res: Response, next: NextFunction) {
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

      //get id from param
      const awsId = req.params?.awsId;

      const awsAccountId = await this.service.updateAwsService({
        instanceId,
        username,
        privateKey,
        awsRegion,
        isDefault,
        publicIp,
        userId: req?.currentUser?._id,
        awsId,
      });

      //send response to client
      res.json({
        msg: "AWS account updated",
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
  public async getAccountById(req: Request, res: Response, next: NextFunction) {
    try {
      //get id from param
      const awsId = req.params?.awsId;

      const awsAccount = await this.service.getAwsAccountByIdService(awsId);

      //send response to client
      res.json({
        msg: "AWS account fetched",
        success: true,
        data: {
          data: awsAccount,
        },
      });
    } catch (error) {
      //handle error
      next(error);
    }
  }
  public async getAllAccount(req: Request, res: Response, next: NextFunction) {
    try {
      //get query parameters

      const { awsRegion, searchTitle, perPage, pageNo } = req.query;

      const awsAccount = await this.service.getAllAwsAccount({
        awsRegion: awsRegion as string,
        searchTitle: searchTitle as string,
        perPage: perPage as string,
        pageNo: pageNo as string,
        userId: req?.currentUser?._id,
      });

      //send response to client
      res.json({
        msg: "AWS account fetched",
        success: true,
        data: awsAccount,
      });
    } catch (error) {
      //handle error
      next(error);
    }
  }
}
