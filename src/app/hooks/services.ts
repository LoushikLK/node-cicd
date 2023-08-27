import { GithubModel } from "../../schemas/github";
import { Installation } from "../../types/installation";
import { PushEvent } from "../../types/push";

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
  public async handlePushEvent(data: PushEvent) {
    try {
    } catch (error) {
      throw error;
    }
  }
}
