"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_service_1 = __importDefault(require("../../services/auth.service"));
const controllers_1 = __importDefault(require("./controllers"));
const validations_1 = require("./validations");
class ProjectRouter extends auth_service_1.default {
    constructor() {
        super();
        this.router = (0, express_1.Router)();
        this.controllers = new controllers_1.default();
        this.routes();
    }
    routes() {
        this.router.post("/", (0, validations_1.createProject)(), this.isAuthenticated, this.controllers.createProject.bind(this.controllers));
        this.router.put("/:projectId", (0, validations_1.updateProject)(), this.isAuthenticated, this.controllers.updateProject.bind(this.controllers));
        this.router.get("/:projectId", (0, validations_1.getProject)(), this.isAuthenticated, this.controllers.getProjectById.bind(this.controllers));
        this.router.delete("/:projectId", (0, validations_1.getProject)(), this.isAuthenticated, this.controllers.deleteProjectById.bind(this.controllers));
        this.router.get("/", (0, validations_1.getAllProjectAccount)(), this.isAuthenticated, this.controllers.getAllProject.bind(this.controllers));
    }
}
exports.default = ProjectRouter;
