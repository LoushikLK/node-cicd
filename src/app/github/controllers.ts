import { NextFunction, Request, Response } from "express";
import GithubService from "./services";

export default class GithubController {
  private service: GithubService;
  constructor() {
    this.service = new GithubService();
  }

  public async installApp(req: Request, res: Response, next: NextFunction) {
    try {
      //send response to client
      res.redirect(
        `https://github.com/apps/node-cicd/installations/new?state=AB12t`
      );
    } catch (error) {
      //handle error
      next(error);
    }
  }

  public async getAccountById(req: Request, res: Response, next: NextFunction) {
    try {
      //get id from param
      const githubId = req.params?.githubId;

      const githubAcc = await this.service.getGithubAccountByIdService(
        githubId
      );

      //send response to client
      res.json({
        msg: "Github account fetched",
        success: true,
        data: {
          data: githubAcc,
        },
      });
    } catch (error) {
      //handle error
      next(error);
    }
  }
  public async deleteAccountById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      //get id from param
      const githubId = req.params?.githubId;

      const githubAcc = await this.service.deleteGithubAccountByIdService(
        githubId
      );

      //send response to client
      res.json({
        msg: "Github account deleted",
        success: true,
        data: {
          data: githubAcc,
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

      const { searchTitle, perPage, pageNo } = req.query;

      const githubAccount = await this.service.getAllGithubAccount({
        searchTitle: searchTitle as string,
        perPage: perPage as string,
        pageNo: pageNo as string,
        userId: req?.currentUser?._id,
      });

      //send response to client
      res.json({
        msg: "Github account fetched",
        success: true,
        data: {
          data: githubAccount,
        },
      });
    } catch (error) {
      //handle error
      next(error);
    }
  }
}
