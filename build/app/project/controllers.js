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
class AwsController {
    constructor() {
        this.service = new services_1.default();
    }
    /**
     * createProject
     *
     */
    createProject(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { githubId, awsId, repositoryUrl, deployBranch, defaultBranch, projectName, rootDirectory, buildCommand, startCommand, autoDeploy, notifyOnFailed, latestCommit, deployCommit, isPrivate, availableBranch, metadata, repositoryId, instanceId, username, publicIp, privateKey, awsRegion, } = req.body;
                //get data from req.body
                const project = yield this.service.createNewProject({
                    githubId,
                    repositoryUrl,
                    repositoryId,
                    deployBranch,
                    defaultBranch,
                    projectName,
                    rootDirectory,
                    buildCommand,
                    startCommand,
                    autoDeploy,
                    notifyOnFailed,
                    latestCommit,
                    deployCommit,
                    isPrivate,
                    availableBranch,
                    metadata,
                    userId: (_a = req === null || req === void 0 ? void 0 : req.currentUser) === null || _a === void 0 ? void 0 : _a._id,
                    instanceId,
                    username,
                    publicIp,
                    privateKey,
                    awsRegion,
                });
                //send response to client
                res.json({
                    msg: "Project created",
                    success: true,
                    data: {
                        data: project,
                    },
                });
            }
            catch (error) {
                //handle error
                next(error);
            }
        });
    }
    updateProject(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { githubId, repositoryUrl, deployBranch, defaultBranch, projectName, rootDirectory, buildCommand, startCommand, autoDeploy, notifyOnFailed, latestCommit, deployCommit, isPrivate, availableBranch, metadata, repositoryId, instanceId, username, publicIp, privateKey, awsRegion, } = req.body;
                //get data from req.body
                //get id from param
                const projectId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.projectId;
                yield this.service.updateProjectService({
                    githubId,
                    repositoryUrl,
                    deployBranch,
                    defaultBranch,
                    projectName,
                    rootDirectory,
                    buildCommand,
                    startCommand,
                    autoDeploy,
                    notifyOnFailed,
                    latestCommit,
                    deployCommit,
                    isPrivate,
                    availableBranch,
                    metadata,
                    projectId,
                    repositoryId,
                    instanceId,
                    username,
                    publicIp,
                    privateKey,
                    awsRegion,
                });
                //send response to client
                res.json({
                    msg: "Project setting updated",
                    success: true,
                });
            }
            catch (error) {
                //handle error
                next(error);
            }
        });
    }
    getProjectById(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //get id from param
                const projectId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.projectId;
                const projectData = yield this.service.getProjectByIdService(projectId);
                //send response to client
                res.json({
                    msg: "Project data fetched",
                    success: true,
                    data: {
                        data: projectData,
                    },
                });
            }
            catch (error) {
                //handle error
                next(error);
            }
        });
    }
    deleteProjectById(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //get id from param
                const projectId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.projectId;
                const projectData = yield this.service.deleteProjectByIdService(projectId);
                //send response to client
                res.json({
                    msg: "Project data fetched",
                    success: true,
                    data: {
                        data: projectData,
                    },
                });
            }
            catch (error) {
                //handle error
                next(error);
            }
        });
    }
    getAllProject(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //get query parameters
                const { searchTitle, perPage, pageNo, githubId, awsId } = req.query;
                const projectData = yield this.service.getAllProject({
                    searchTitle: searchTitle,
                    perPage: perPage,
                    pageNo: pageNo,
                    awsId: awsId,
                    githubId: githubId,
                    userId: (_a = req === null || req === void 0 ? void 0 : req.currentUser) === null || _a === void 0 ? void 0 : _a._id,
                });
                //send response to client
                res.json({
                    msg: "Project fetched successfully",
                    success: true,
                    data: projectData,
                });
            }
            catch (error) {
                //handle error
                next(error);
            }
        });
    }
}
exports.default = AwsController;
