"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_service_1 = __importDefault(require("../../services/auth.service"));
const controllers_1 = __importDefault(require("./controllers"));
const validations_1 = require("./validations");
class GithubRouter extends auth_service_1.default {
    constructor() {
        super();
        this.router = (0, express_1.Router)();
        this.controllers = new controllers_1.default();
        this.routes();
    }
    routes() {
        this.router.get("/install", this.controllers.installApp.bind(this.controllers));
        this.router.get("/:githubId", (0, validations_1.getGithubAccount)(), this.isAuthenticated, this.controllers.getAccountById.bind(this.controllers));
        this.router.get("/repo/:githubId", (0, validations_1.getGithubAccount)(), this.isAuthenticated, this.controllers.getGithubRepo.bind(this.controllers));
        this.router.get("/branch/:githubId/:repo/details", (0, validations_1.getGithubBranch)(), this.isAuthenticated, this.controllers.getGithubRepoDetails.bind(this.controllers));
        this.router.get("/branch/:githubId/:repo", (0, validations_1.getGithubBranch)(), this.isAuthenticated, this.controllers.getGithubRepoBranch.bind(this.controllers));
        this.router.delete("/:githubId", (0, validations_1.getGithubAccount)(), this.isAuthenticated, this.controllers.deleteAccountById.bind(this.controllers));
        this.router.get("/", (0, validations_1.getAllGithubAccount)(), this.isAuthenticated, this.controllers.getAllAccount.bind(this.controllers));
    }
}
exports.default = GithubRouter;
