import { BadRequest, NotFound, Unauthorized } from "http-errors";
import { FilterQuery } from "mongoose";
import useFetch from "../../helpers/fetcher.helper";
import { generateAccessToken } from "../../helpers/github.helper";
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

  public async getUsersRepository(
    githubId: string,
    userId: string,
    perPage?: string,
    pageNo?: string
  ) {
    const githubAccount = await GithubModel.findOne({
      _id: githubId,
      userId,
    }).select(
      "userId accessToken refreshToken accessTokenExpireAt refreshTokenExpireAt githubId"
    );

    if (!githubAccount) throw new NotFound("Github account not found");

    if (!githubAccount?.refreshTokenExpireAt)
      throw new Unauthorized("No access token provided reinstall github app");

    let accessToken = await generateAccessToken(githubAccount?.githubId);

    if (!accessToken) throw new Error("Access token not found");

    const repositories = await useFetch(
      `https://api.github.com/user/repos?per_page=${perPage}&page=${pageNo}`,
      {
        method: "GET",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return repositories;
  }
  public async getRepositoriesBranches(
    githubId: string,
    userId: string,
    repo: string
  ) {
    const githubAccount = await GithubModel.findOne({
      _id: githubId,
      userId,
    }).select(
      "userId accessToken refreshToken accessTokenExpireAt refreshTokenExpireAt githubId githubUserName"
    );

    if (!githubAccount) throw new NotFound("Github account not found");

    if (!githubAccount?.accessTokenExpireAt)
      throw new Unauthorized("No access token provided reinstall github app");

    let accessToken = await generateAccessToken(githubAccount?.githubId);

    if (!accessToken) throw new NotFound("Access token not found");

    const branched = await useFetch(
      `https://api.github.com/repos/${githubAccount?.githubUserName}/${repo}/branches`,
      {
        method: "GET",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return branched;
  }
  public async getRepositoriesDetails(
    githubId: string,
    userId: string,
    repo: string
  ) {
    const githubAccount = await GithubModel.findOne({
      _id: githubId,
      userId,
    }).select(
      "userId accessToken refreshToken accessTokenExpireAt refreshTokenExpireAt githubId githubUserName"
    );

    if (!githubAccount) throw new NotFound("Github account not found");

    if (!githubAccount?.accessTokenExpireAt)
      throw new Unauthorized("No access token provided reinstall github app");

    let accessToken = await generateAccessToken(githubAccount?.githubId);

    if (!accessToken) throw new NotFound("Access token not found");

    const repository = await useFetch(
      `https://api.github.com/repos/${githubAccount?.githubUserName}/${repo}`,
      {
        method: "GET",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return repository;
  }
}
