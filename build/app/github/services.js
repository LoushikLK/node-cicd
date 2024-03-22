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
const http_errors_1 = require("http-errors");
const fetcher_helper_1 = __importDefault(require("../../helpers/fetcher.helper"));
const github_helper_1 = require("../../helpers/github.helper");
const pagination_helper_1 = __importDefault(require("../../helpers/pagination.helper"));
const github_1 = require("../../schemas/github");
const project_1 = require("../../schemas/project");
class GithubService {
    getGithubAccountByIdService(githubId) {
        return __awaiter(this, void 0, void 0, function* () {
            const githubAccount = yield github_1.GithubModel.findById(githubId).select("-__v -updatedAt");
            if (!githubAccount)
                throw new http_errors_1.BadRequest("Github account not found");
            return githubAccount;
        });
    }
    deleteGithubAccountByIdService(githubId) {
        return __awaiter(this, void 0, void 0, function* () {
            //delete all project associated with this aws account
            yield project_1.ProjectModel.deleteMany({
                githubId: githubId,
            });
            const githubAccount = yield github_1.GithubModel.findByIdAndDelete(githubId).select("-__v -updatedAt");
            if (!githubAccount)
                throw new http_errors_1.BadRequest("Github account not found");
            return githubAccount;
        });
    }
    getAllGithubAccount({ searchTitle, pageNo, perPage, userId, }) {
        return __awaiter(this, void 0, void 0, function* () {
            //create dynamic query
            let dynamicQuery = { userId: userId };
            if (searchTitle)
                dynamicQuery.$or = [
                    {
                        githubUserName: new RegExp(searchTitle, "i"),
                    },
                    {
                        owner: new RegExp(searchTitle, "i"),
                    },
                ];
            const githubAcc = yield (0, pagination_helper_1.default)({
                model: github_1.GithubModel,
                query: dynamicQuery,
                perPage,
                pageNo,
            });
            if (!githubAcc)
                throw new http_errors_1.BadRequest("Github accounts not found");
            return githubAcc;
        });
    }
    getUsersRepository(githubId, userId, perPage, pageNo) {
        return __awaiter(this, void 0, void 0, function* () {
            const githubAccount = yield github_1.GithubModel.findOne({
                _id: githubId,
                userId,
            }).select("userId accessToken refreshToken accessTokenExpireAt refreshTokenExpireAt githubId");
            if (!githubAccount)
                throw new http_errors_1.NotFound("Github account not found");
            if (!(githubAccount === null || githubAccount === void 0 ? void 0 : githubAccount.refreshTokenExpireAt))
                throw new http_errors_1.Unauthorized("No access token provided reinstall github app");
            let accessToken = yield (0, github_helper_1.generateAccessToken)(githubAccount === null || githubAccount === void 0 ? void 0 : githubAccount.githubId);
            if (!accessToken)
                throw new Error("Access token not found");
            const repositories = yield (0, fetcher_helper_1.default)(`https://api.github.com/user/repos?per_page=${perPage}&page=${pageNo}`, {
                method: "GET",
                headers: {
                    Accept: "application/vnd.github+json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return repositories;
        });
    }
    getRepositoriesBranches(githubId, userId, repo) {
        return __awaiter(this, void 0, void 0, function* () {
            const githubAccount = yield github_1.GithubModel.findOne({
                _id: githubId,
                userId,
            }).select("userId accessToken refreshToken accessTokenExpireAt refreshTokenExpireAt githubId githubUserName");
            if (!githubAccount)
                throw new http_errors_1.NotFound("Github account not found");
            if (!(githubAccount === null || githubAccount === void 0 ? void 0 : githubAccount.accessTokenExpireAt))
                throw new http_errors_1.Unauthorized("No access token provided reinstall github app");
            let accessToken = yield (0, github_helper_1.generateAccessToken)(githubAccount === null || githubAccount === void 0 ? void 0 : githubAccount.githubId);
            if (!accessToken)
                throw new http_errors_1.NotFound("Access token not found");
            const branched = yield (0, fetcher_helper_1.default)(`https://api.github.com/repos/${githubAccount === null || githubAccount === void 0 ? void 0 : githubAccount.githubUserName}/${repo}/branches`, {
                method: "GET",
                headers: {
                    Accept: "application/vnd.github+json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return branched;
        });
    }
    getRepositoriesDetails(githubId, userId, repo) {
        return __awaiter(this, void 0, void 0, function* () {
            const githubAccount = yield github_1.GithubModel.findOne({
                _id: githubId,
                userId,
            }).select("userId accessToken refreshToken accessTokenExpireAt refreshTokenExpireAt githubId githubUserName");
            if (!githubAccount)
                throw new http_errors_1.NotFound("Github account not found");
            if (!(githubAccount === null || githubAccount === void 0 ? void 0 : githubAccount.accessTokenExpireAt))
                throw new http_errors_1.Unauthorized("No access token provided reinstall github app");
            let accessToken = yield (0, github_helper_1.generateAccessToken)(githubAccount === null || githubAccount === void 0 ? void 0 : githubAccount.githubId);
            if (!accessToken)
                throw new http_errors_1.NotFound("Access token not found");
            const repository = yield (0, fetcher_helper_1.default)(`https://api.github.com/repos/${githubAccount === null || githubAccount === void 0 ? void 0 : githubAccount.githubUserName}/${repo}`, {
                method: "GET",
                headers: {
                    Accept: "application/vnd.github+json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return repository;
        });
    }
}
exports.default = GithubService;
