"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const http_errors_1 = require("http-errors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_config_1 = __importDefault(require("../configs/env.config"));
const generateToken = (payload, options) => __awaiter(void 0, void 0, void 0, function* () {
    const jwtSecret = (0, env_config_1.default)().APP_JWT_SECRET;
    if (!jwtSecret)
        throw new http_errors_1.InternalServerError("JWT secret is not found.");
    return jsonwebtoken_1.default.sign(payload, jwtSecret, {
        expiresIn: (options === null || options === void 0 ? void 0 : options.expiresIn) || "1d",
    });
});
exports.generateToken = generateToken;
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const jwtSecret = (0, env_config_1.default)().APP_JWT_SECRET;
    if (!jwtSecret)
        throw new http_errors_1.InternalServerError("JWT secret is not found.");
    return jsonwebtoken_1.default.verify(token === null || token === void 0 ? void 0 : token.split(" ")[1], jwtSecret);
});
exports.verifyToken = verifyToken;
