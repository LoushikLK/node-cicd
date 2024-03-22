"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = __importDefault(require("./controllers"));
class AuthRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new controllers_1.default();
        this.routes();
    }
    routes() {
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
        this.router.get("/github/login", this.controller.redirectToGithub.bind(this.controller));
        this.router.get("/github/callback", this.controller.generateInstalledToken.bind(this.controller));
        this.router.get("/generate-token", this.controller.createUserToken.bind(this.controller));
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
exports.default = AuthRouter;
