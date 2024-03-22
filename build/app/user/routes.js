"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_service_1 = __importDefault(require("../../services/auth.service"));
const controllers_1 = __importDefault(require("./controllers"));
class UserRouter extends auth_service_1.default {
    constructor() {
        super();
        this.router = (0, express_1.Router)();
        this.controller = new controllers_1.default();
        this.routes();
    }
    /**
     * Generates the routes for the API.
     *
     * @return {void} - Does not return anything.
     */
    routes() {
        this.router.get("/self", this.isAuthenticated, this.controller.getSelf.bind(this.controller));
    }
}
exports.default = UserRouter;
