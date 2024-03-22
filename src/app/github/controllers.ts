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
  public async getGithubRepo(req: Request, res: Response, next: NextFunction) {
    try {
      //get id from param
      const githubId = req.params?.githubId;
      //get pagination data from query

      const { perPage = 1000, pageNo = 1 } = req.query;

      const repository = await this.service.getUsersRepository(
        githubId,
        req?.currentUser?._id,
        perPage as string,
        pageNo as string
      );

      //send response to client
      res.json({
        msg: "Github repo fetched",
        success: true,
        data: {
          data: repository,
          perPage,
          pageNo,
        },
      });
    } catch (error) {
      //handle error
      next(error);
    }
  }
  public async getGithubRepoBranch(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      //get id from param
      const githubId = req.params?.githubId;

      const repo = req.params?.repo;

      const branches = await this.service.getRepositoriesBranches(
        githubId,
        req?.currentUser?._id,
        repo
      );

      //send response to client
      res.json({
        msg: "Github branch fetched",
        success: true,
        data: {
          data: branches,
        },
      });
    } catch (error) {
      //handle error
      next(error);
    }
  }
  public async getGithubRepoDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      //get id from param
      const githubId = req.params?.githubId;

      const repo = req.params?.repo;

      const repository = await this.service.getRepositoriesDetails(
        githubId,
        req?.currentUser?._id,
        repo
      );

      //send response to client
      res.json({
        msg: "Github repository fetched",
        success: true,
        data: {
          data: repository,
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
