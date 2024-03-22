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
const github_helper_1 = require("../../helpers/github.helper");
const build_1 = require("../../schemas/build");
const github_1 = require("../../schemas/github");
const project_1 = require("../../schemas/project");
const ssh_service_1 = __importDefault(require("../../services/ssh.service"));
class HookService {
    handleInstallationCreateEvent(data) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //when installation created save the data in users details
                //find the user with the same github id
                yield github_1.GithubModel.findOneAndUpdate({
                    githubId: (_b = (_a = data === null || data === void 0 ? void 0 : data.installation) === null || _a === void 0 ? void 0 : _a.account) === null || _b === void 0 ? void 0 : _b.id,
                }, {
                    owner: (_d = (_c = data === null || data === void 0 ? void 0 : data.installation) === null || _c === void 0 ? void 0 : _c.account) === null || _d === void 0 ? void 0 : _d.login,
                    appInstalled: true,
                    installationId: (_e = data === null || data === void 0 ? void 0 : data.installation) === null || _e === void 0 ? void 0 : _e.id,
                }, {
                    upsert: true,
                    new: true,
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    handleInstallationDeleteEvent(data) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //when installation suspended save the data in users details
                //find the user with the same github id
                yield github_1.GithubModel.findOneAndUpdate({
                    githubId: (_b = (_a = data === null || data === void 0 ? void 0 : data.installation) === null || _a === void 0 ? void 0 : _a.account) === null || _b === void 0 ? void 0 : _b.id,
                }, {
                    appInstalled: false,
                }, {
                    upsert: true,
                    new: true,
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    handlePushEvent(data) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //find the github account associate with it
                const githubAccount = yield github_1.GithubModel.findOne({
                    $and: [
                        {
                            installationId: (_b = (_a = data === null || data === void 0 ? void 0 : data.installation) === null || _a === void 0 ? void 0 : _a.id) === null || _b === void 0 ? void 0 : _b.toString(),
                        },
                        {
                            githubId: (_e = (_d = (_c = data === null || data === void 0 ? void 0 : data.repository) === null || _c === void 0 ? void 0 : _c.owner) === null || _d === void 0 ? void 0 : _d.id) === null || _e === void 0 ? void 0 : _e.toString(),
                        },
                    ],
                });
                if (!githubAccount)
                    return;
                if (!(githubAccount === null || githubAccount === void 0 ? void 0 : githubAccount.appInstalled))
                    return;
                if (!(githubAccount === null || githubAccount === void 0 ? void 0 : githubAccount.refreshToken))
                    return;
                let branch = (_g = (_f = data === null || data === void 0 ? void 0 : data.ref) === null || _f === void 0 ? void 0 : _f.split("/")) === null || _g === void 0 ? void 0 : _g.at(-1);
                //find the project
                const projectData = yield project_1.ProjectModel.findOne({
                    $and: [
                        { githubId: githubAccount === null || githubAccount === void 0 ? void 0 : githubAccount._id },
                        {
                            deployBranch: branch,
                        },
                        {
                            repositoryId: (_j = (_h = data === null || data === void 0 ? void 0 : data.repository) === null || _h === void 0 ? void 0 : _h.id) === null || _j === void 0 ? void 0 : _j.toString(),
                        },
                    ],
                });
                if (!projectData)
                    return;
                if (!(projectData === null || projectData === void 0 ? void 0 : projectData.autoDeploy))
                    return;
                projectData.latestCommit = (_k = data === null || data === void 0 ? void 0 : data.head_commit) === null || _k === void 0 ? void 0 : _k.message;
                projectData.deployCommit = (_l = data === null || data === void 0 ? void 0 : data.head_commit) === null || _l === void 0 ? void 0 : _l.id;
                projectData.lastBuildStatus = "PENDING";
                projectData.metadata.push(data);
                yield projectData.save();
                //start the build event
                this.handleBuild(data, projectData === null || projectData === void 0 ? void 0 : projectData._id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    handleBuild(data, projectId) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return __awaiter(this, void 0, void 0, function* () {
            const buildData = yield build_1.BuildModel.create({
                projectId: projectId,
                buildCommit: (_a = data === null || data === void 0 ? void 0 : data.commits[0]) === null || _a === void 0 ? void 0 : _a.message,
                reason: "PUSH",
                status: "PENDING",
                metadata: data,
                buildStartedBy: (_c = (_b = data === null || data === void 0 ? void 0 : data.commits[0]) === null || _b === void 0 ? void 0 : _b.committer) === null || _c === void 0 ? void 0 : _c.username,
            });
            if (!buildData)
                return;
            //find the aws credentials
            const awsCCredentials = yield project_1.ProjectModel.findById(projectId)
                .populate([
                {
                    path: "githubId",
                    select: "_id githubId",
                },
            ])
                .select("awsId githubId repositoryUrl deployBranch buildCommand startCommand rootDirectory");
            if (!awsCCredentials)
                throw new Error("Build failed due to aws credentials not found");
            try {
                const accessToken = yield (0, github_helper_1.generateAccessToken)((_d = awsCCredentials === null || awsCCredentials === void 0 ? void 0 : awsCCredentials.githubId) === null || _d === void 0 ? void 0 : _d.githubId);
                if (!(accessToken === null || accessToken === void 0 ? void 0 : accessToken.length))
                    throw new Error("Build failed due to access token not found");
                const repositoryName = (_g = (_f = (_e = awsCCredentials === null || awsCCredentials === void 0 ? void 0 : awsCCredentials.repositoryUrl) === null || _e === void 0 ? void 0 : _e.split("/")) === null || _f === void 0 ? void 0 : _f.at(-1)) === null || _g === void 0 ? void 0 : _g.split(".git")[0];
                const repositoryUrl = (_j = (_h = awsCCredentials === null || awsCCredentials === void 0 ? void 0 : awsCCredentials.repositoryUrl) === null || _h === void 0 ? void 0 : _h.split("https://")) === null || _j === void 0 ? void 0 : _j.at(-1);
                let allCommand = [];
                //remove already created repository
                if (repositoryName)
                    allCommand.push(`rm -rf ${repositoryName}`);
                //clone the project
                allCommand.push(`git clone https://${accessToken}@${repositoryUrl}`);
                //change directory to the projects directory
                if (repositoryName)
                    allCommand.push(`cd ${repositoryName}`);
                //apply users build command
                if (awsCCredentials === null || awsCCredentials === void 0 ? void 0 : awsCCredentials.buildCommand)
                    allCommand.push(awsCCredentials === null || awsCCredentials === void 0 ? void 0 : awsCCredentials.buildCommand);
                //apply users start command
                if (awsCCredentials === null || awsCCredentials === void 0 ? void 0 : awsCCredentials.startCommand)
                    allCommand.push(awsCCredentials === null || awsCCredentials === void 0 ? void 0 : awsCCredentials.startCommand);
                //run all command to the remote server
                const command = yield (0, ssh_service_1.default)({
                    host: awsCCredentials === null || awsCCredentials === void 0 ? void 0 : awsCCredentials.publicIp,
                    privateKey: awsCCredentials === null || awsCCredentials === void 0 ? void 0 : awsCCredentials.privateKey,
                    username: awsCCredentials === null || awsCCredentials === void 0 ? void 0 : awsCCredentials.username,
                    command: allCommand === null || allCommand === void 0 ? void 0 : allCommand.join("\n"),
                });
                buildData.buildOutPut.push(command);
                yield buildData.save();
                buildData.status = "SUCCESS";
                awsCCredentials.lastBuildStatus = "SUCCESS";
                //start the build event
            }
            catch (error) {
                if (error instanceof Error) {
                    buildData.buildOutPut.push(error === null || error === void 0 ? void 0 : error.message);
                }
                else {
                    buildData.buildOutPut.push("Something went wrong");
                }
                buildData.status = "FAILED";
                awsCCredentials.lastBuildStatus = "FAILED";
            }
            finally {
                yield buildData.save();
                yield awsCCredentials.save();
            }
        });
    }
}
exports.default = HookService;
