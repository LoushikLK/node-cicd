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
const pagination_helper_1 = __importDefault(require("../../helpers/pagination.helper"));
const project_1 = require("../../schemas/project");
class AwsServices {
    constructor() { }
    createNewProject({ githubId, repositoryUrl, deployBranch, defaultBranch, projectName, rootDirectory, buildCommand, startCommand, autoDeploy, notifyOnFailed, latestCommit, deployCommit, isPrivate, availableBranch, metadata, userId, repositoryId, instanceId, username, publicIp, privateKey, awsRegion, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const projectCreate = yield project_1.ProjectModel.create({
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
                userId,
                repositoryId,
                instanceId,
                username,
                publicIp,
                privateKey,
                awsRegion,
            });
            if (!projectCreate)
                throw new http_errors_1.BadRequest("Project create failed");
            return projectCreate._id;
        });
    }
    updateProjectService({ githubId, repositoryUrl, deployBranch, defaultBranch, projectName, rootDirectory, buildCommand, startCommand, autoDeploy, notifyOnFailed, latestCommit, deployCommit, isPrivate, availableBranch, metadata, projectId, repositoryId, instanceId, username, publicIp, privateKey, awsRegion, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield project_1.ProjectModel.findByIdAndUpdate(projectId, {
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
                repositoryId,
                instanceId,
                username,
                publicIp,
                privateKey,
                awsRegion,
            });
            if (!project)
                throw new http_errors_1.BadRequest("Project not found");
            return project._id;
        });
    }
    getProjectByIdService(awsId) {
        return __awaiter(this, void 0, void 0, function* () {
            const projectData = yield project_1.ProjectModel.findById(awsId)
                .select("-__v -updatedAt")
                .populate([
                {
                    path: "githubId",
                    select: "isDefault owner appInstalled githubProfileImage githubProfileUrl accessPrivate accessPublic",
                },
            ]);
            if (!projectData)
                throw new http_errors_1.BadRequest("Project not found");
            return projectData;
        });
    }
    deleteProjectByIdService(awsId) {
        return __awaiter(this, void 0, void 0, function* () {
            const projectData = yield project_1.ProjectModel.findByIdAndDelete(awsId).select("-__v -updatedAt");
            if (!projectData)
                throw new http_errors_1.BadRequest("Project not found");
            return projectData;
        });
    }
    getAllProject({ searchTitle, pageNo, perPage, githubId, userId, }) {
        return __awaiter(this, void 0, void 0, function* () {
            //create dynamic query
            let dynamicQuery = {
                userId: userId,
            };
            if (searchTitle)
                dynamicQuery.$or = [
                    {
                        repositoryUrl: new RegExp(searchTitle, "i"),
                    },
                    {
                        projectName: new RegExp(searchTitle, "i"),
                    },
                    {
                        deployBranch: new RegExp(searchTitle, "i"),
                    },
                ];
            if (githubId)
                dynamicQuery.githubId = githubId;
            const projectData = yield (0, pagination_helper_1.default)({
                model: project_1.ProjectModel,
                query: dynamicQuery,
                perPage,
                pageNo,
                select: "-__v -updatedAt",
                populate: [
                    {
                        path: "githubId",
                        select: "isDefault owner appInstalled githubProfileImage githubProfileUrl accessPrivate accessPublic",
                    },
                ],
            });
            if (!projectData)
                throw new http_errors_1.BadRequest("Projects not found");
            return projectData;
        });
    }
}
exports.default = AwsServices;
