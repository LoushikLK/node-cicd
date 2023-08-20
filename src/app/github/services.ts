import { BadRequest } from "http-errors";
import { FilterQuery } from "mongoose";
import paginationHelper from "../../helpers/pagination.helper";
import { GithubModel } from "../../schemas/github";
import { ProjectModel } from "../../schemas/project";
import { IGithub } from "../../types/github";
export default class GithubService {
  public async getGithubAccountByIdService(githubId: string) {
    const githubAccount = await GithubModel.findById(githubId).select(
      "-__v -updatedAt"
    );

    if (!githubAccount) throw new BadRequest("Github account not found");

    return githubAccount;
  }
  public async deleteGithubAccountByIdService(githubId: string) {
    //delete all project associated with this aws account

    await ProjectModel.deleteMany({
      githubId: githubId,
    });
    const githubAccount = await GithubModel.findByIdAndDelete(githubId).select(
      "-__v -updatedAt"
    );

    if (!githubAccount) throw new BadRequest("Github account not found");

    return githubAccount;
  }
  public async getAllGithubAccount({
    searchTitle,
    pageNo,
    perPage,
    userId,
  }: {
    searchTitle?: string;
    perPage?: string;
    pageNo?: string;
    userId?: string;
  }) {
    //create dynamic query

    let dynamicQuery: FilterQuery<IGithub> = { userId: userId };

    if (searchTitle)
      dynamicQuery.$or = [
        {
          githubUserName: new RegExp(searchTitle, "i"),
        },
        {
          owner: new RegExp(searchTitle, "i"),
        },
      ];

    const githubAcc = await paginationHelper({
      model: GithubModel,
      query: dynamicQuery,
      perPage,
      pageNo,
    });

    if (!githubAcc) throw new BadRequest("Github accounts not found");

    return githubAcc;
  }
}
