import { Router } from "express";
import AuthService from "../../services/auth.service";
import ProjectController from "./controllers";
import {
  createProject,
  getAllProjectAccount,
  getProject,
  updateProject,
} from "./validations";

export default class ProjectRouter extends AuthService {
  public router: Router;
  private controllers: ProjectController;

  constructor() {
    super();
    this.router = Router();
    this.controllers = new ProjectController();
    this.routes();
  }

  private routes() {
    this.router.post(
      "/",
      createProject(),
      this.isAuthenticated,
      this.controllers.createProject.bind(this.controllers)
    );
    this.router.put(
      "/:projectId",
      updateProject(),
      this.isAuthenticated,
      this.controllers.updateProject.bind(this.controllers)
    );
    this.router.get(
      "/:projectId",
      getProject(),
      this.isAuthenticated,
      this.controllers.getProjectById.bind(this.controllers)
    );
    this.router.delete(
      "/:projectId",
      getProject(),
      this.isAuthenticated,
      this.controllers.deleteProjectById.bind(this.controllers)
    );
    this.router.get(
      "/",
      getAllProjectAccount(),
      this.isAuthenticated,
      this.controllers.getAllProject.bind(this.controllers)
    );
  }
}
