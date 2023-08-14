import { Router } from "express";
import AuthService from "../../services/auth.service";

export default class AwsRouter extends AuthService {
  public router: Router;
  constructor() {
    super();
    this.router = Router();
  }
}
