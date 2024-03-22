"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_service_1 = __importDefault(require("../../services/auth.service"));
class AwsRouter extends auth_service_1.default {
    constructor() {
        super();
        this.router = (0, express_1.Router)();
    }
}
exports.default = AwsRouter;
