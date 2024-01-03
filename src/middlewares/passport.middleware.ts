import { NotFound } from "http-errors";
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
   * passportGoogleLoginStrategy
   */
  public async passportGoogleLoginStrategy() {
    passport.use(
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
                email: profile?.emails?.[0].value,
              },
              {
                emailVerified: profile?.emails?.[0]?.verified === "true",
                displayName: profile.displayName,
                googleAccessToken: accessToken,
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
