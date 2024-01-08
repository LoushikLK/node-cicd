import { Router } from "express";
import AuthService from "../../services/auth.service";
import UserController from "./controllers";

export default class UserRouter extends AuthService {
  public router: Router;
  private controller: UserController;

  constructor() {
    super();
    this.router = Router();
    this.controller = new UserController();
    this.routes();
  }
  /**
   * Generates the routes for the API.
   *
   * @return {void} - Does not return anything.
   */

  public routes() {
    this.router.get(
      "/self",
      this.isAuthenticated,
      this.controller.getSelf.bind(this.controller)
    );
  }
}
