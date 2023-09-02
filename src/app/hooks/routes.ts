import { Router } from "express";
import AuthService from "../../services/auth.service";
import HookControllers from "./controllers";

export default class HookRouter extends AuthService {
  public router: Router;
  private controllers: HookControllers;

  constructor() {
    super();
    this.router = Router();
    this.controllers = new HookControllers();
    this.routes();
  }

  private routes() {
    this.router.post("/", this.controllers.handleHooks.bind(this.controllers));
  }
}
