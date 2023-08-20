import { BadRequest } from "http-errors";
import { FilterQuery } from "mongoose";
import paginationHelper from "../../helpers/pagination.helper";
import { GithubModel } from "../../schemas/github";
import { IGithub } from "../../types/github";
export default class GithubService {
  public async getGithubAccountByIdService(awsId: string) {
    const githubAccount = await GithubModel.findById(awsId).select(
      "-__v -updatedAt"
    );

    if (!githubAccount) throw new BadRequest("Github account not found");

    return githubAccount;
  }
  public async getAllGithubAccount({
    searchTitle,
    pageNo,
    perPage,
  }: {
    searchTitle?: string;
    perPage?: string;
    pageNo?: string;
  }) {
    //create dynamic query

    let dynamicQuery: FilterQuery<IGithub> = {};

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
