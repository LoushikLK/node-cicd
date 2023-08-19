import { Router } from "express";
import AuthService from "../../services/auth.service";
import AwsController from "./controllers";
import { createAwsAccount } from "./validations";

export default class AwsRouter extends AuthService {
  public router: Router;
  private controllers: AwsController;

  constructor() {
    super();
    this.router = Router();
    this.controllers = new AwsController();
    this.routes();
  }

  private routes() {
    this.router.post(
      "/",
      createAwsAccount(),
      this.isAuthenticated,
      this.controllers.createUser.bind(this.controllers)
    );
  }
}
