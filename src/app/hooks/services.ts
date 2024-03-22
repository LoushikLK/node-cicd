import { generateAccessToken } from "../../helpers/github.helper";
import { BuildModel } from "../../schemas/build";
import { GithubModel } from "../../schemas/github";
import { ProjectModel } from "../../schemas/project";
import sendCommand from "../../services/ssh.service";
import { IGithub } from "../../types/github";
import { Installation } from "../../types/installation";
import IProject from "../../types/project";
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
            installationId: data?.installation?.id?.toString(),
          },
          {
            githubId: data?.repository?.owner?.id?.toString(),
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
            repositoryId: data?.repository?.id?.toString(),
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

      //start the build event
      this.handleBuild(data, projectData?._id);
    } catch (error) {
      throw error;
    }
  }
  public async handleBuild(data: PushEventPayload, projectId: string) {
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
    const awsCCredentials: IProject & { githubId: IGithub } =
      await ProjectModel.findById(projectId)
        .populate([
          {
            path: "githubId",
            select: "_id githubId",
          },
        ])
        .select(
          "awsId githubId repositoryUrl deployBranch buildCommand startCommand rootDirectory"
        );

    if (!awsCCredentials)
      throw new Error("Build failed due to aws credentials not found");

    try {
      const accessToken = await generateAccessToken(
        awsCCredentials?.githubId?.githubId
      );

      if (!accessToken?.length)
        throw new Error("Build failed due to access token not found");

      const repositoryName = awsCCredentials?.repositoryUrl
        ?.split("/")
        ?.at(-1)
        ?.split(".git")[0];
      const repositoryUrl = awsCCredentials?.repositoryUrl
        ?.split("https://")
        ?.at(-1);

      let allCommand = [];

      //remove already created repository
      if (repositoryName) allCommand.push(`rm -rf ${repositoryName}`);

      //clone the project
      allCommand.push(`git clone https://${accessToken}@${repositoryUrl}`);

      //change directory to the projects directory
      if (repositoryName) allCommand.push(`cd ${repositoryName}`);

      //apply users build command
      if (awsCCredentials?.buildCommand)
        allCommand.push(awsCCredentials?.buildCommand);

      //apply users start command
      if (awsCCredentials?.startCommand)
        allCommand.push(awsCCredentials?.startCommand);

      //run all command to the remote server
      const command = await sendCommand({
        host: awsCCredentials?.publicIp,
        privateKey: awsCCredentials?.privateKey,
        username: awsCCredentials?.username,
        command: allCommand?.join("\n"),
      });

      buildData.buildOutPut.push(command);
      await buildData.save();
      buildData.status = "SUCCESS";
      awsCCredentials.lastBuildStatus = "SUCCESS";

      //start the build event
    } catch (error) {
      if (error instanceof Error) {
        buildData.buildOutPut.push(error?.message);
      } else {
        buildData.buildOutPut.push("Something went wrong");
      }
      buildData.status = "FAILED";
      awsCCredentials.lastBuildStatus = "FAILED";
    } finally {
      await buildData.save();
      await awsCCredentials.save();
    }
  }
}
