import { NextFunction, Request, Response } from "express";
import { Unauthorized } from "http-errors";
import envConfig from "../../configs/env.config";
import { generateToken } from "../../helpers/jwt.helper";
import { UserModel } from "../../schemas/user";
import { sendEmail } from "../../services/mail.service";
import Service from "./services";

export default class Controllers {
  private service: Service;
  constructor() {
    this.service = new Service();
  }

  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      //get all the data from body
      const { displayName, email, gender, phoneNumber, countryCode, password } =
        req.body;
      //create a user
      const newUser = await this.service.emailRegister({
        displayName,
        email,
        gender,
        phoneNumber,
        countryCode,
        rawPassword: password,
      });
      //send email to the user about account created and verification link
      await sendEmail({
        to: newUser.email,
        subject: "Verify Your Email",
        text: `
        <h3 style="width:100%;text-align:center;" >Please verify your email by clicking on the link below.</h3>
        <a style="width:100%;text-align:center;display:flex;" href="http://localhost:8000/verify-email/${newUser.token}" >Verify</a>
        `,
      });
      //send response to client
      res.json({
        msg: "Verify your email.",
        success: true,
      });
    } catch (error) {
      //handle error
      next(error);
    }
  }
  public async resendVerificationCode(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      //get all the data from body
      const { email, isPhoneNumber, phoneNumber } = req.body;

      //check if user exist
      const user = await this.service.checkUserExist(email);

      if (!isPhoneNumber && email && user?.emailVerified) {
        res.status(200);
        throw new Error("Email already verified.");
      }
      if (isPhoneNumber && phoneNumber && user?.phoneNumberVerified) {
        res.status(200);
        throw new Error("Phone number already verified.");
      }

      //else create a new verification code

      const token = await generateToken(
        {
          email: user?.email,
          displayName: user?.displayName,
        },
        {
          expiresIn: "5m",
        }
      );

      //send email to the user about account created and verification link
      !isPhoneNumber &&
        email &&
        (await sendEmail({
          to: user?.email,
          subject: "Verify Your Email",
          text: `
        <h3 style="width:100%;text-align:center;" >Please verify your email by clicking on the link below.</h3>
        <a style="width:100%;text-align:center;display:flex;" href="http://localhost:8000/verify-email/${token}" >Verify</a>
        `,
        }));

      //send response to client
      res.json({
        msg: "Verification email sent.",
        success: true,
      });
    } catch (error) {
      //handle error
      next(error);
    }
  }
  public async verifyUser(req: Request, res: Response, next: NextFunction) {
    try {
      //get all the data from body
      const { token } = req.body;

      //verify email
      await this.service.verifyEmailToken(token);

      //send response to client
      res.json({
        msg: "Email verified successfully.",
        success: true,
      });
    } catch (error) {
      //handle error
      next(error);
    }
  }
  public async userLogin(req: Request, res: Response, next: NextFunction) {
    try {
      //get all the data from body
      const { email, password } = req.body;

      //check if the user exist
      const user = await this.service.checkUserExist(email);

      //after user found call the authentication method on user schema to check and verify about password
      const authenticUser = user.authenticate(password);

      //if password is not match throw an error
      if (!authenticUser)
        throw new Unauthorized("Email or password is invalid.");

      //check is user is blocked or not
      if (user.blockStatus === "BLOCKED")
        throw new Unauthorized("Account is blocked.");

      //update users logged in status

      user.isLoggedIn = true;
      user.isOnline = true;
      user.lastLoginTime = new Date();

      //after that save the user
      await user.save();

      //if user is valid return a token to user
      //create a token
      const token = await generateToken({
        email: user?.email,
        id: user?._id,
        displayName: user?.displayName,
        role: user?.role,
      });

      //send response to client
      res.json({
        msg: "Success",
        success: true,
        ACCESS_TOKEN: token,
      });
    } catch (error) {
      //handle error
      next(error);
    }
  }
  public async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      //get all the data from body
      const { email, password, newPassword } = req.body;
      //validate user is exist or not

      //change the password
      const user = await this.service.verifyAndCreateNewPassword(
        email,
        password,
        newPassword
      );

      //send email to the user about account created and verification link
      await sendEmail({
        to: user.email,
        subject: "Password Changed!",
        text: `
        <h3 style="width:100%;text-align:center;" >Your password has been changed recently. If not done by you change your password immediately.</h3>
        <a style="width:100%;text-align:center;display:flex;" href="http://localhost:8000/change-password >Change Password</a>
        `,
      });
      //send response to client
      res.json({
        msg: "Password changed successfully.",
        success: true,
      });
    } catch (error) {
      //handle error
      next(error);
    }
  }
  public async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      //get all the data from body
      const { email } = req.body;

      //generate otp send to email

      const user = await this.service.createOTPAndSave(email);

      //send email to the user about otp
      await sendEmail({
        to: user.email,
        subject: "One Time Password",
        text: `
        <h3 style="width:100%;text-align:center;" >OTP to recover your account.</h3>
        <h1 style="width:100%;text-align:center;text:blue" >${user.verificationInfo.otp}</h1>
        
        `,
      });
      //send response to client
      res.json({
        msg: "OTP sent.",
        success: true,
      });
    } catch (error) {
      //handle error
      next(error);
    }
  }
  public async forgotPasswordVerify(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      //get all the data from body
      const { otp, newPassword, email } = req.body;
      //validate otp
      await this.service.verifyOTPAndChangePassword({
        email,
        otp,
        password: newPassword,
      });

      //send response to client
      res.json({
        msg: "Account recover successful.",
        success: true,
      });
    } catch (error) {
      //handle error
      next(error);
    }
  }
  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      //update the user
      await UserModel.findByIdAndUpdate(req?.body?._id, {
        isLoggedIn: false,
        isOnline: false,
      });

      //send response to client
      res.json({
        msg: "You have been logged out successfully.",
        success: true,
      });
    } catch (error) {
      //handle error
      next(error);
    }
  }
  public async createUserToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      //check if user is authorized if not throws error

      if (!req?.isAuthenticated()) throw new Unauthorized("Unauthorized.");

      //if user is not present throws an error

      if (!req?.user) throw new Unauthorized("Not authorized.");

      //if user present create new token

      const userToken = await this.service.generateUserToken(req?.user);

      //send token to the client
      res
        .status(403)
        .redirect(
          envConfig().LoginSuccessCallbackURL + `?redirect=${userToken}`
        );
    } catch (error) {
      //handle error
      next(error);
    }
  }
  public async redirectToGithub(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      //redirect to github for login
      res
        .status(300)
        .redirect(
          `https://github.com/login/oauth/authorize?client_id=${
            envConfig().GithubAppClientId
          }`
        );
    } catch (error) {
      //handle error
      next(error);
    }
  }
  public async generateInstalledToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = await this.service.generateGithubToken(
        req?.query?.code as string
      );

      //redirect client to reload page
      res
        .status(203)
        .redirect(
          envConfig().GithubInstallationRedirectUrl +
            `?redirect=${token}&reload=true`
        );
    } catch (error) {
      //handle error
      next(error);
    }
  }
}
