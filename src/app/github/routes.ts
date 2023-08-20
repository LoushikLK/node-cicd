import { Router } from "express";
import AuthService from "../../services/auth.service";
import GithubController from "./controllers";
import { getAllGithubAccount, getGithubAccount } from "./validations";

export default class GithubRouter extends AuthService {
  public router: Router;
  private controllers: GithubController;

  constructor() {
    super();
    this.router = Router();
    this.controllers = new GithubController();
    this.routes();
  }

  private routes() {
    this.router.get(
      "/install",
      this.controllers.installApp.bind(this.controllers)
    );
    this.router.get(
      "/:githubId",
      getGithubAccount(),
      this.isAuthenticated,
      this.controllers.getAccountById.bind(this.controllers)
    );
    this.router.delete(
      "/:githubId",
      getGithubAccount(),
      this.isAuthenticated,
      this.controllers.deleteAccountById.bind(this.controllers)
    );
    this.router.get(
      "/",
      getAllGithubAccount(),
      this.isAuthenticated,
      this.controllers.getAllAccount.bind(this.controllers)
    );
  }
}
