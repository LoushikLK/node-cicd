import { InternalServerError, NotFound } from "http-errors";
import passport from "passport";

import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";

import envConfig from "../configs/env.config";
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
}
