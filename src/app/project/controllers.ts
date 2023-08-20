import { NextFunction, Request, Response } from "express";
import AwsServices from "./services";

export default class AwsController {
  private service: AwsServices;
  constructor() {
    this.service = new AwsServices();
  }

  /**
   * createProject
   *
   */
  public async createProject(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        githubId,
        awsId,
        repositoryUrl,
        deployBranch,
        defaultBranch,
        projectName,
        rootDirectory,
        buildCommand,
        startCommand,
        autoDeploy,
        notifyOnFailed,
        latestCommit,
        deployCommit,
        isPrivate,
        availableBranch,
        metadata,
      } = req.body;
      //get data from req.body
      const project = await this.service.createNewProject({
        githubId,
        awsId,
        repositoryUrl,
        deployBranch,
        defaultBranch,
        projectName,
        rootDirectory,
        buildCommand,
        startCommand,
        autoDeploy,
        notifyOnFailed,
        latestCommit,
        deployCommit,
        isPrivate,
        availableBranch,
        metadata,
        userId: req?.currentUser?._id,
      });

      //send response to client
      res.json({
        msg: "Project created",
        success: true,
        data: {
          data: project,
        },
      });
    } catch (error) {
      //handle error
      next(error);
    }
  }
  public async updateProject(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        githubId,
        awsId,
        repositoryUrl,
        deployBranch,
        defaultBranch,
        projectName,
        rootDirectory,
        buildCommand,
        startCommand,
        autoDeploy,
        notifyOnFailed,
        latestCommit,
        deployCommit,
        isPrivate,
        availableBranch,
        metadata,
      } = req.body;
      //get data from req.body

      //get id from param
      const projectId = req.params?.projectId;

      await this.service.updateProjectService({
        githubId,
        awsId,
        repositoryUrl,
        deployBranch,
        defaultBranch,
        projectName,
        rootDirectory,
        buildCommand,
        startCommand,
        autoDeploy,
        notifyOnFailed,
        latestCommit,
        deployCommit,
        isPrivate,
        availableBranch,
        metadata,
        projectId,
      });

      //send response to client
      res.json({
        msg: "Project setting updated",
        success: true,
      });
    } catch (error) {
      //handle error
      next(error);
    }
  }
  public async getProjectById(req: Request, res: Response, next: NextFunction) {
    try {
      //get id from param
      const projectId = req.params?.projectId;

      const projectData = await this.service.getProjectByIdService(projectId);

      //send response to client
      res.json({
        msg: "Project data fetched",
        success: true,
        data: {
          data: projectData,
        },
      });
    } catch (error) {
      //handle error
      next(error);
    }
  }
  public async getAllProject(req: Request, res: Response, next: NextFunction) {
    try {
      //get query parameters

      const { searchTitle, perPage, pageNo, githubId, awsId } = req.query;

      const projectData = await this.service.getAllProject({
        searchTitle: searchTitle as string,
        perPage: perPage as string,
        pageNo: pageNo as string,
        awsId: awsId as string,
        githubId: githubId as string,
        userId: req?.currentUser?._id,
      });

      //send response to client
      res.json({
        msg: "Project fetched successfully",
        success: true,
        data: projectData,
      });
    } catch (error) {
      //handle error
      next(error);
    }
  }
}
