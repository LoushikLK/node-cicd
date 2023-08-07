import { Router } from "express";
import passport from "passport";

import envConfig from "../../configs/env.config";
import Controllers from "./controllers";
import {
  validateChangePassword,
  validateEmailLogin,
  validateEmailRegistration,
  validateEmailVerify,
  validateForgotPassword,
  validateForgotPasswordOTPVerify,
  validateResendVerificationCode,
} from "./validations";

export default class AuthRouter {
  public router: Router;
  private controller: Controllers;

  constructor() {
    this.router = Router();
    this.controller = new Controllers();
    this.routes();
  }

  public routes() {
    this.router.post(
      "/email-register",
      validateEmailRegistration(),
      this.controller.register
    );
    this.router.post("/login", validateEmailLogin(), this.controller.userLogin);
    this.router.get(
      "/google/register",
      passport.authenticate("google-register", { scope: ["profile", "email"] })
    );
    this.router.post(
      "/google/login",
      passport.authenticate("google-login", { scope: ["profile", "email"] })
    );
    this.router.post(
      "/google/callback",
      passport.authenticate("google-login", {
        scope: ["profile", "email"],
        successRedirect: envConfig().LoginSuccessCallbackURL,
        failureRedirect: envConfig().LoginFailedCallbackURL,
      })
    );

    this.router.get(
      "/facebook/register",
      passport.authenticate("facebook-register")
    );
    this.router.post(
      "/facebook/login",
      passport.authenticate("facebook-login")
    );

    this.router.get(
      "/facebook/callback",
      passport.authenticate("facebook-login", {
        failureRedirect: envConfig().LoginFailedCallbackURL,
        successRedirect: envConfig().LoginSuccessCallbackURL,
      })
    );

    this.router.get("/generate-token", this.controller.createUserToken);
    this.router.post(
      "/change-password",
      validateChangePassword(),
      this.controller.changePassword
    );
    this.router.post(
      "/resend-verification-code",
      validateResendVerificationCode(),
      this.controller.resendVerificationCode
    );
    this.router.post(
      "/verify",
      validateEmailVerify(),
      this.controller.verifyUser
    );
    this.router.post(
      "/forgot-password",
      validateForgotPassword(),
      this.controller.forgotPassword
    );
    this.router.post(
      "/forgot-password-verify",
      validateForgotPasswordOTPVerify(),
      this.controller.forgotPasswordVerify
    );
    this.router.post("/logout", this.controller.logout);
  }
}
