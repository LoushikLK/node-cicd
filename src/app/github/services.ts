import { BadRequest, NotFound, Unauthorized } from "http-errors";
import { FilterQuery } from "mongoose";
import useFetch from "../../helpers/fetcher.helper";
import { generateAccessTokenFromRefreshToken } from "../../helpers/github.helper";
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
      "userId accessToken refreshToken accessTokenExpireAt refreshTokenExpireAt"
    );

    if (!githubAccount) throw new NotFound("Github account not found");

    if (!githubAccount?.accessTokenExpireAt)
      throw new Unauthorized("No access token provided reinstall github app");

    let accessToken;

    //check if access token expire
    if (new Date(githubAccount?.accessTokenExpireAt) < new Date()) {
      let token = await generateAccessTokenFromRefreshToken(
        githubAccount?.refreshToken,
        githubAccount?.refreshTokenExpireAt
      );

      accessToken = token?.access_token;
      githubAccount.accessToken = token?.access_token;
      githubAccount.accessTokenExpireAt = new Date(
        Date.now() + token?.expires_in
      );
      githubAccount.refreshToken = token?.refresh_token;
      githubAccount.refreshTokenExpireAt = new Date(
        Date.now() + token?.refresh_token_expires_in
      );
      await githubAccount.save();
    } else {
      accessToken = githubAccount?.accessToken;
    }

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
    //delete all project associated with this aws account

    await ProjectModel.deleteMany({
      githubId: githubId,
    });
    const githubAccount = await GithubModel.findOne({
      _id: githubId,
      // userId,
    }).select(
      "userId accessToken refreshToken accessTokenExpireAt refreshTokenExpireAt"
    );

    if (!githubAccount) throw new NotFound("Github account not found");

    if (!githubAccount?.accessTokenExpireAt)
      throw new Unauthorized("No access token provided reinstall github app");

    let accessToken;

    //check if access token expire
    if (new Date(githubAccount?.accessTokenExpireAt) < new Date()) {
      let token = await generateAccessTokenFromRefreshToken(
        githubAccount?.refreshToken,
        githubAccount?.refreshTokenExpireAt
      );

      accessToken = token?.access_token;
      githubAccount.accessToken = token?.access_token;
      githubAccount.accessTokenExpireAt = new Date(
        Date.now() + token?.expires_in
      );
      githubAccount.refreshToken = token?.refresh_token;
      githubAccount.refreshTokenExpireAt = new Date(
        Date.now() + token?.refresh_token_expires_in
      );
      await githubAccount.save();
    } else {
      accessToken = githubAccount?.accessToken;
    }

    const branched = await useFetch(
      `https://api.github.com/repos/LoushikLk/${repo}/branches`,
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
}
