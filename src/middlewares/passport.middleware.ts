import { InternalServerError, NotFound } from "http-errors";
import passport from "passport";

import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import {
  GoogleClientId,
  GoogleClientSecret,
  GoogleRegisterCallbackURL,
} from "../configs/env.config";
import { UserModel } from "../schemas/user";

export default class PassportService {
  /**
   * passportGoogleRegisterStrategy
   */
  public async passportGoogleRegisterStrategy() {
    passport.use(
      "google-register",
      new GoogleStrategy(
        {
          clientID: GoogleClientId,
          clientSecret: GoogleClientSecret,
          callbackURL: GoogleRegisterCallbackURL,
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

            if (!user) return new InternalServerError("User not registered.");
            done(null, user);
          } catch (error) {
            if (error instanceof Error) {
              done(error);
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
          clientID: GoogleClientId,
          clientSecret: GoogleClientSecret,
          callbackURL: GoogleRegisterCallbackURL,
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

            if (!user) return new NotFound("User not found.");
            done(null, user);
          } catch (error) {
            if (error instanceof Error) {
              done(error);
            }
            done(new Error("Something went wrong"));
          }
        }
      )
    );
  }
}
