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
exports.generateAccessToken = void 0;
const env_config_1 = __importDefault(require("../configs/env.config"));
const github_1 = require("../schemas/github");
const fetcher_helper_1 = __importDefault(require("./fetcher.helper"));
const generateAccessToken = (githubId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!githubId)
            return "";
        //find users account from accessToken
        const githubAccount = yield github_1.GithubModel.findOne({
            githubId,
        }).select("accessToken refreshToken accessTokenExpireAt refreshTokenExpireAt");
        if (!githubAccount)
            return "";
        if (new Date(githubAccount === null || githubAccount === void 0 ? void 0 : githubAccount.accessTokenExpireAt) > new Date())
            return githubAccount === null || githubAccount === void 0 ? void 0 : githubAccount.accessToken;
        if (new Date(githubAccount === null || githubAccount === void 0 ? void 0 : githubAccount.refreshTokenExpireAt) < new Date())
            return "";
        if (new Date(githubAccount === null || githubAccount === void 0 ? void 0 : githubAccount.accessTokenExpireAt) < new Date() &&
            new Date(githubAccount === null || githubAccount === void 0 ? void 0 : githubAccount.refreshTokenExpireAt) > new Date()) {
            const accessToken = yield (0, fetcher_helper_1.default)(`https://github.com/login/oauth/access_token?client_id=${(0, env_config_1.default)().GithubAppClientId}&client_secret=${(0, env_config_1.default)().GithubAppSecret}&grant_type=refresh_token&refresh_token=${githubAccount === null || githubAccount === void 0 ? void 0 : githubAccount.refreshToken}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                },
            });
            if (!(accessToken === null || accessToken === void 0 ? void 0 : accessToken.access_token))
                return "";
            githubAccount.accessToken = accessToken === null || accessToken === void 0 ? void 0 : accessToken.access_token;
            githubAccount.accessTokenExpireAt = new Date(Date.now() + (accessToken === null || accessToken === void 0 ? void 0 : accessToken.expires_in) * 1000);
            githubAccount.refreshToken = accessToken === null || accessToken === void 0 ? void 0 : accessToken.refresh_token;
            githubAccount.refreshTokenExpireAt = new Date(Date.now() + (accessToken === null || accessToken === void 0 ? void 0 : accessToken.refresh_token_expires_in) * 1000);
            yield githubAccount.save();
            return accessToken === null || accessToken === void 0 ? void 0 : accessToken.access_token;
        }
    }
    catch (error) {
        return "";
    }
});
exports.generateAccessToken = generateAccessToken;
