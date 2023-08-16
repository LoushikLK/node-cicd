import { Router } from "express";
import AuthService from "../../services/auth.service";
import AwsController from "./controllers";

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
    this.router.post("/", this.isAuthenticated, this.controllers.createUser);
  }
}
