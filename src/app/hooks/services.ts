import { BuildModel } from "../../schemas/build";
import { GithubModel } from "../../schemas/github";
import { ProjectModel } from "../../schemas/project";
import { Installation } from "../../types/installation";
import { PushEventPayload } from "../../types/push";

export default class HookService {
  public async handleInstallationCreateEvent(data: Installation) {
    try {
      //when installation created save the data in users details
      //find the user with the same github id
      await GithubModel.findOneAndUpdate(
        {
          githubId: data?.installation?.account?.id,
        },
        {
          owner: data?.installation?.account?.login,
          appInstalled: true,
          installationId: data?.installation?.id,
        },

        {
          upsert: true,
          new: true,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  public async handleInstallationDeleteEvent(data: Installation) {
    try {
      //when installation suspended save the data in users details
      //find the user with the same github id
      await GithubModel.findOneAndUpdate(
        {
          githubId: data?.installation?.account?.id,
        },
        {
          appInstalled: false,
        },
        {
          upsert: true,
          new: true,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  public async handlePushEvent(data: PushEventPayload) {
    try {
      //find the github account associate with it
      const githubAccount = await GithubModel.findOne({
        $and: [
          {
            installationId: data?.installation?.id,
          },
          {
            githubId: data?.repository?.id,
          },
        ],
      });

      if (!githubAccount) return;

      if (!githubAccount?.appInstalled) return;
      if (!githubAccount?.refreshToken) return;

      let branch = data?.ref?.split("/")?.at(-1);

      //find the project
      const projectData = await ProjectModel.findOne({
        $and: [
          { githubId: githubAccount?._id },
          {
            deployBranch: branch,
          },
          {
            repositoryUrl: data?.clone_url,
          },
        ],
      });

      if (!projectData) return;

      if (!projectData?.autoDeploy) return;

      projectData.latestCommit = data?.head_commit?.message;
      projectData.deployCommit = data?.head_commit?.id;

      projectData.lastBuildStatus = "PENDING";

      projectData.metadata.push(data);

      await projectData.save();

      this.handleBuild(data, projectData?._id);

      //start the build event
    } catch (error) {
      throw error;
    }
  }
  public async handleBuild(data: PushEventPayload, projectId: string) {
    try {
      const buildData = await BuildModel.create({
        projectId: projectId,
        buildCommit: data?.commits[0]?.message,
        reason: "PUSH",
        status: "PENDING",
        metadata: data,
        buildStartedBy: data?.commits[0]?.committer?.username,
      });

      if (!buildData) return;

      //find the aws credentials
      const awsCCredentials = await ProjectModel.findById(projectId)
        .populate([
          {
            path: "awsId",
            select: "username publicIp privateKey",
          },
          {
            path: "githubId",
            select: "accessToken refreshToken",
          },
        ])
        .select(
          "awsId githubId repositoryUrl deployBranch buildCommand startCommand rootDirectory"
        );

      if (!awsCCredentials) return;
      //connect to aws

      //start the build event
    } catch (error) {
      throw error;
    }
  }
}
