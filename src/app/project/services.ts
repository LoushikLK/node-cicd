import { BadRequest } from "http-errors";
import { FilterQuery } from "mongoose";
import paginationHelper from "../../helpers/pagination.helper";
import { ProjectModel } from "../../schemas/project";
import IProject from "../../types/project";
export default class AwsServices {
  constructor() {}
  public async createNewProject({
    githubId,

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
    repositoryId,
    instanceId,
    username,
    publicIp,
    privateKey,
    awsRegion,
  }: {
    githubId: string;

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
    repositoryId: string;
    instanceId: string;
    username: string;
    publicIp: string;
    privateKey: string;
    awsRegion: string;
  }) {
    const projectCreate = await ProjectModel.create({
      githubId,

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
      repositoryId,
      instanceId,
      username,
      publicIp,
      privateKey,
      awsRegion,
    });

    if (!projectCreate) throw new BadRequest("Project create failed");

    return projectCreate._id;
  }
  public async updateProjectService({
    githubId,

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
    repositoryId,
    instanceId,
    username,
    publicIp,
    privateKey,
    awsRegion,
  }: {
    githubId: string;

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
    repositoryId: string;
    instanceId: string;
    username?: string;
    publicIp?: string;
    privateKey?: string;
    awsRegion?: string;
  }) {
    const project = await ProjectModel.findByIdAndUpdate(projectId, {
      githubId,

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
      repositoryId,
      instanceId,
      username,
      publicIp,
      privateKey,
      awsRegion,
    });

    if (!project) throw new BadRequest("Project not found");

    return project._id;
  }
  public async getProjectByIdService(awsId: string) {
    const projectData = await ProjectModel.findById(awsId)
      .select("-__v -updatedAt")
      .populate([
        {
          path: "githubId",
          select:
            "isDefault owner appInstalled githubProfileImage githubProfileUrl accessPrivate accessPublic",
        },
      ]);

    if (!projectData) throw new BadRequest("Project not found");

    return projectData;
  }
  public async deleteProjectByIdService(awsId: string) {
    const projectData = await ProjectModel.findByIdAndDelete(awsId).select(
      "-__v -updatedAt"
    );

    if (!projectData) throw new BadRequest("Project not found");

    return projectData;
  }
  public async getAllProject({
    searchTitle,
    pageNo,
    perPage,

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

    const projectData = await paginationHelper({
      model: ProjectModel,
      query: dynamicQuery,
      perPage,
      pageNo,
      select: "-__v -updatedAt",
      populate: [
        {
          path: "githubId",
          select:
            "isDefault owner appInstalled githubProfileImage githubProfileUrl accessPrivate accessPublic",
        },
      ],
    });

    if (!projectData) throw new BadRequest("Projects not found");

    return projectData;
  }
}
