import { Router } from "express";
import Controllers from "./controllers";

export default class AuthRouter {
  public router: Router;
  private controller: Controllers;

  constructor() {
    this.router = Router();
    this.controller = new Controllers();
    this.routes();
  }

  public routes() {
    // this.router.post(
    //   "/email-register",
    //   validateEmailRegistration(),
    //   this.controller.register.bind(this.controller)
    // );
    // this.router.post(
    //   "/login",
    //   validateEmailLogin(),
    //   this.controller.userLogin.bind(this.controller)
    // );
    // this.router.get(
    //   "/google/login",
    //   passport.authenticate("google", { scope: ["profile", "email"] })
    // );
    // this.router.get(
    //   "/google/callback",
    //   passport.authenticate("google", {
    //     scope: ["profile", "email"],
    //     failureRedirect: envConfig().LoginFailedCallbackURL,
    //   }),
    //   this.controller.createUserToken.bind(this.controller)
    // );

    this.router.get(
      "/github/login",
      this.controller.redirectToGithub.bind(this.controller)
    );

    this.router.get(
      "/github/callback",
      this.controller.generateInstalledToken.bind(this.controller)
    );

    this.router.get(
      "/generate-token",
      this.controller.createUserToken.bind(this.controller)
    );
    // this.router.post(
    //   "/change-password",
    //   validateChangePassword(),
    //   this.controller.changePassword.bind(this.controller)
    // );
    // this.router.post(
    //   "/resend-verification-code",
    //   validateResendVerificationCode(),
    //   this.controller.resendVerificationCode.bind(this.controller)
    // );
    // this.router.post(
    //   "/verify",
    //   validateEmailVerify(),
    //   this.controller.verifyUser.bind(this.controller)
    // );
    // this.router.post(
    //   "/forgot-password",
    //   validateForgotPassword(),
    //   this.controller.forgotPassword.bind(this.controller)
    // );
    // this.router.post(
    //   "/forgot-password-verify",
    //   validateForgotPasswordOTPVerify(),
    //   this.controller.forgotPasswordVerify.bind(this.controller)
    // );
    this.router.post("/logout", this.controller.logout.bind(this.controller));
  }
}
