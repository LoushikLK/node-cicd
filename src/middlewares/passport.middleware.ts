import { InternalServerError, NotFound } from "http-errors";
import passport from "passport";
import {
  Strategy as GitHubStrategy,
  Profile as GithubProfile,
} from "passport-github2";

import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";

import envConfig from "../configs/env.config";
import useFetch from "../helpers/fetcher.helper";
import { UserModel } from "../schemas/user";

export default class PassportService {
  /**
   * passportGoogleRegisterStrategy
   */
  public async passportGoogleRegisterStrategy() {
    return passport.use(
      "google-register",
      new GoogleStrategy(
        {
          clientID: envConfig().GoogleClientId,
          clientSecret: envConfig().GoogleClientSecret,
          callbackURL: envConfig().GoogleRegisterCallbackURL,
        },
        async (
          accessToken: string,
          refreshToken: string,
          profile: Profile,
          done: VerifyCallback
        ) => {
          try {
            //verify and create user

            const user = await UserModel.create(
              {
                googleId: profile.id,
                email: profile?.emails?.[0].value,
                emailVerified: profile?.emails?.[0]?.verified === "true",
                displayName: profile.displayName,
                googleAccessToken: accessToken,
                photoUrl: profile.photos?.[0].value,
              },
              {
                runValidators: true,
                lean: true,
              }
            );

            if (!user) throw new InternalServerError("User not registered.");
            done(null, user);
          } catch (error) {
            if (error instanceof Error) {
              return done(error);
            }
            done(new Error("Something went wrong"));
          }
        }
      )
    );
  }
  /**
   * passportGoogleLoginStrategy
   */
  public async passportGoogleLoginStrategy() {
    passport.use(
      "google-login",
      new GoogleStrategy(
        {
          clientID: envConfig().GoogleClientId,
          clientSecret: envConfig().GoogleClientSecret,
          callbackURL: envConfig().GoogleRegisterCallbackURL,
        },
        async (
          accessToken: string,
          refreshToken: string,
          profile: Profile,
          done: VerifyCallback
        ) => {
          try {
            //verify  user

            const user = await UserModel.findOneAndUpdate(
              {
                googleId: profile.id,
              },
              {
                displayName: profile.displayName,
                googleAccessToken: accessToken,
                photoUrl: profile.photos?.[0].value,
              },
              {
                runValidators: true,
                lean: true,
              }
            );

            if (!user) throw new NotFound("User not found.");
            done(null, user);
          } catch (error) {
            if (error instanceof Error) {
              return done(error);
            }
            done(new Error("Something went wrong"));
          }
        }
      )
    );
  }

  /**
   * passportGoogleLoginStrategy
   */
  public async passportGithubLoginStrategy() {
    return passport.use(
      "github-login",
      new GitHubStrategy(
        {
          clientID: envConfig().GithubOAuthClientId,
          clientSecret: envConfig().GithubOAuthClientSecret,
          callbackURL: envConfig().GithubRegisterCallbackURL,
        },
        async (
          accessToken: string,
          refreshToken: string,
          profile: GithubProfile,
          done: VerifyCallback
        ) => {
          try {
            //verify  user

            const userEmails: {
              email: string;
              primary: boolean;
              verified: boolean;
            }[] = await useFetch(`https://api.github.com/user/emails`, {
              method: "GET",
              headers: {
                Accept: "application/vnd.github+json",
                Authorization: `Bearer ${accessToken}`,
              },
            });

            const user = await UserModel.findOneAndUpdate(
              {
                email: userEmails?.find((item) => item?.primary === true)
                  ?.email,
              },
              {
                githubId: profile.id,
                displayName: profile.displayName,
                githubAccessToken: accessToken,
                githubSecretToken: refreshToken,
                photoUrl: profile.photos?.[0].value,
              },
              {
                runValidators: true,
                lean: true,
                upsert: true,
                new: true,
              }
            );

            if (!user) throw new NotFound("User not found.");
            done(null, user);
          } catch (error) {
            if (error instanceof Error) {
              return done(error);
            }
            done(new Error("Something went wrong"));
          }
        }
      )
    );
  }
}
