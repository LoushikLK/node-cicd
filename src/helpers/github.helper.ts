import { Unauthorized } from "http-errors";
import envConfig from "../configs/env.config";
import useFetch from "./fetcher.helper";

export const generateAccessTokenFromRefreshToken = async (
  refreshToken: string,
  expireAt?: string | Date
) => {
  try {
    if (expireAt && new Date(expireAt) < new Date())
      throw new Unauthorized("Refresh token expires");

    //generate access token using refreshToken

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
      }&grant_type=refresh_token&refresh_token=${refreshToken}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      }
    );

    return {
      access_token: accessToken?.access_token,
      expires_in: accessToken?.expires_in,
      refresh_token: accessToken?.refresh_token,
      refresh_token_expires_in: accessToken?.refresh_token_expires_in,
      scope: accessToken?.scope,
      token_type: accessToken?.token_type,
    };
  } catch (error) {
    throw error;
  }
};
