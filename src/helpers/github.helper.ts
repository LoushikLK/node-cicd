import envConfig from "../configs/env.config";
import { GithubModel } from "../schemas/github";
import useFetch from "./fetcher.helper";

export const generateAccessToken = async (githubId: string) => {
  try {
    if (!githubId) return "";

    //find users account from accessToken

    const githubAccount = await GithubModel.findOne({
      githubId,
    }).select(
      "accessToken refreshToken accessTokenExpireAt refreshTokenExpireAt"
    );

    if (!githubAccount) return "";

    if (new Date(githubAccount?.accessTokenExpireAt) > new Date())
      return githubAccount?.accessToken;
    if (new Date(githubAccount?.refreshTokenExpireAt) < new Date()) return "";
    if (
      new Date(githubAccount?.accessTokenExpireAt) < new Date() &&
      new Date(githubAccount?.refreshTokenExpireAt) > new Date()
    ) {
      const accessToken: {
        access_token: string;
        expires_in: number;
        refresh_token: string;
        refresh_token_expires_in: number;
        scope: string;
        token_type: string;
      } = await useFetch(
        `https://github.com/login/oauth/access_token?client_id=${
          envConfig().GithubAppClientId
        }&client_secret=${
          envConfig().GithubAppSecret
        }&grant_type=refresh_token&refresh_token=${
          githubAccount?.refreshToken
        }`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!accessToken?.access_token) return "";

      githubAccount.accessToken = accessToken?.access_token;
      githubAccount.accessTokenExpireAt = new Date(
        Date.now() + accessToken?.expires_in * 1000
      );
      githubAccount.refreshToken = accessToken?.refresh_token;
      githubAccount.refreshTokenExpireAt = new Date(
        Date.now() + accessToken?.refresh_token_expires_in * 1000
      );

      await githubAccount.save();

      return accessToken?.access_token;
    }
  } catch (error) {
    return "";
  }
};
