import { BadRequest } from "http-errors";
import { FilterQuery } from "mongoose";
import paginationHelper from "../../helpers/pagination.helper";
import { ProjectModel } from "../../schemas/project";
import { IProject } from "../../types/project";
export default class AwsServices {
  constructor() {}
  public async createNewProject({
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
    userId,
  }: {
    githubId: string;
    awsId: string;
    repositoryUrl: string;
    deployBranch: string;
    defaultBranch: string;
    projectName: string;
    rootDirectory: string;
    buildCommand: string;
    startCommand: string;
    autoDeploy: string;
    notifyOnFailed: string;
    latestCommit: string;
    deployCommit: string;
    isPrivate: string;
    availableBranch: string;
    metadata: any;
    userId: string;
  }) {
    const projectCreate = await ProjectModel.create({
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
      userId,
    });

    if (!projectCreate) throw new BadRequest("Project create failed");

    return projectCreate._id;
  }
  public async updateProjectService({
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
  }: {
    githubId: string;
    awsId: string;
    repositoryUrl: string;
    deployBranch: string;
    defaultBranch: string;
    projectName: string;
    rootDirectory: string;
    buildCommand: string;
    startCommand: string;
    autoDeploy: string;
    notifyOnFailed: string;
    latestCommit: string;
    deployCommit: string;
    isPrivate: string;
    availableBranch: string;
    metadata: any;
    projectId: string;
  }) {
    const project = await ProjectModel.findByIdAndUpdate(projectId, {
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
    });

    if (!project) throw new BadRequest("Project not found");

    return project._id;
  }
  public async getProjectByIdService(awsId: string) {
    const projectData = await ProjectModel.findById(awsId).select(
      "-__v -updatedAt"
    );

    if (!projectData) throw new BadRequest("Project not found");

    return projectData;
  }
  public async getAllProject({
    searchTitle,
    pageNo,
    perPage,
    awsId,
    githubId,
    userId,
  }: {
    searchTitle?: string;
    perPage?: string;
    pageNo?: string;
    awsId?: string;
    githubId?: string;
    userId?: string;
  }) {
    //create dynamic query

    let dynamicQuery: FilterQuery<IProject> = {
      userId: userId,
    };

    if (searchTitle)
      dynamicQuery.$or = [
        {
          repositoryUrl: new RegExp(searchTitle, "i"),
        },
        {
          projectName: new RegExp(searchTitle, "i"),
        },
        {
          deployBranch: new RegExp(searchTitle, "i"),
        },
      ];

    if (githubId) dynamicQuery.githubId = githubId;
    if (awsId) dynamicQuery.awsId = awsId;

    const projectData = await paginationHelper({
      model: ProjectModel,
      query: dynamicQuery,
      perPage,
      pageNo,
      select: "-__v -updatedAt",
    });

    if (!projectData) throw new BadRequest("Projects not found");

    return projectData;
  }
}
