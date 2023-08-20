import { Router } from "express";
import AuthService from "../../services/auth.service";
import AwsController from "./controllers";
import {
  createAwsAccount,
  getAllAwsAccount,
  getAwsAccount,
  updateAWsAccount,
} from "./validations";

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
    this.router.put(
      "/:awsId",
      updateAWsAccount(),
      this.isAuthenticated,
      this.controllers.updateUser.bind(this.controllers)
    );
    this.router.get(
      "/:awsId",
      getAwsAccount(),
      this.isAuthenticated,
      this.controllers.getAccountById.bind(this.controllers)
    );
    this.router.delete(
      "/:awsId",
      getAwsAccount(),
      this.isAuthenticated,
      this.controllers.deleteAccountById.bind(this.controllers)
    );
    this.router.get(
      "/",
      getAllAwsAccount(),
      this.isAuthenticated,
      this.controllers.getAllAccount.bind(this.controllers)
    );
  }
}
