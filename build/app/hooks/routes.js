"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_service_1 = __importDefault(require("../../services/auth.service"));
const controllers_1 = __importDefault(require("./controllers"));
class HookRouter extends auth_service_1.default {
    constructor() {
        super();
        this.router = (0, express_1.Router)();
        this.controllers = new controllers_1.default();
        this.routes();
    }
    routes() {
        this.router.post("/", this.controllers.handleHooks.bind(this.controllers));
    }
}
exports.default = HookRouter;
