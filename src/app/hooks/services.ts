import { GithubModel } from "../../schemas/github";
import { ProjectModel } from "../../schemas/project";
import { Installation } from "../../types/installation";
import { BuildStatus } from "../../types/project";
import { PushEventPayload } from "../../types/push";

export default class HookService {
  constructor() {}
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

      projectData.$push = {
        metadata: data,
      };

      projectData.lastBuildStatus = BuildStatus.PENDING;

      await projectData.save();

      //start the build event
    } catch (error) {
      throw error;
    }
  }
}
