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
const services_1 = __importDefault(require("./services"));
class GithubController {
    constructor() {
        this.service = new services_1.default();
    }
    installApp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //send response to client
                res.redirect(`https://github.com/apps/node-cicd/installations/new?state=AB12t`);
            }
            catch (error) {
                //handle error
                next(error);
            }
        });
    }
    getAccountById(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //get id from param
                const githubId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.githubId;
                const githubAcc = yield this.service.getGithubAccountByIdService(githubId);
                //send response to client
                res.json({
                    msg: "Github account fetched",
                    success: true,
                    data: {
                        data: githubAcc,
                    },
                });
            }
            catch (error) {
                //handle error
                next(error);
            }
        });
    }
    getGithubRepo(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //get id from param
                const githubId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.githubId;
                //get pagination data from query
                const { perPage = 1000, pageNo = 1 } = req.query;
                const repository = yield this.service.getUsersRepository(githubId, (_b = req === null || req === void 0 ? void 0 : req.currentUser) === null || _b === void 0 ? void 0 : _b._id, perPage, pageNo);
                //send response to client
                res.json({
                    msg: "Github repo fetched",
                    success: true,
                    data: {
                        data: repository,
                        perPage,
                        pageNo,
                    },
                });
            }
            catch (error) {
                //handle error
                next(error);
            }
        });
    }
    getGithubRepoBranch(req, res, next) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //get id from param
                const githubId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.githubId;
                const repo = (_b = req.params) === null || _b === void 0 ? void 0 : _b.repo;
                const branches = yield this.service.getRepositoriesBranches(githubId, (_c = req === null || req === void 0 ? void 0 : req.currentUser) === null || _c === void 0 ? void 0 : _c._id, repo);
                //send response to client
                res.json({
                    msg: "Github branch fetched",
                    success: true,
                    data: {
                        data: branches,
                    },
                });
            }
            catch (error) {
                //handle error
                next(error);
            }
        });
    }
    getGithubRepoDetails(req, res, next) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //get id from param
                const githubId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.githubId;
                const repo = (_b = req.params) === null || _b === void 0 ? void 0 : _b.repo;
                const repository = yield this.service.getRepositoriesDetails(githubId, (_c = req === null || req === void 0 ? void 0 : req.currentUser) === null || _c === void 0 ? void 0 : _c._id, repo);
                //send response to client
                res.json({
                    msg: "Github repository fetched",
                    success: true,
                    data: {
                        data: repository,
                    },
                });
            }
            catch (error) {
                //handle error
                next(error);
            }
        });
    }
    deleteAccountById(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //get id from param
                const githubId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.githubId;
                const githubAcc = yield this.service.deleteGithubAccountByIdService(githubId);
                //send response to client
                res.json({
                    msg: "Github account deleted",
                    success: true,
                    data: {
                        data: githubAcc,
                    },
                });
            }
            catch (error) {
                //handle error
                next(error);
            }
        });
    }
    getAllAccount(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //get query parameters
                const { searchTitle, perPage, pageNo } = req.query;
                const githubAccount = yield this.service.getAllGithubAccount({
                    searchTitle: searchTitle,
                    perPage: perPage,
                    pageNo: pageNo,
                    userId: (_a = req === null || req === void 0 ? void 0 : req.currentUser) === null || _a === void 0 ? void 0 : _a._id,
                });
                //send response to client
                res.json({
                    msg: "Github account fetched",
                    success: true,
                    data: {
                        data: githubAccount,
                    },
                });
            }
            catch (error) {
                //handle error
                next(error);
            }
        });
    }
}
exports.default = GithubController;
