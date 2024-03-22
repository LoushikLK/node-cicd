"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModel = void 0;
const mongoose_1 = require("mongoose");
const projectSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    githubId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Github",
    },
    repositoryUrl: String,
    repositoryId: String,
    deployBranch: String,
    defaultBranch: String,
    projectName: String,
    lastBuildStatus: String,
    rootDirectory: String,
    buildCommand: String,
    startCommand: String,
    autoDeploy: {
        type: Boolean,
        default: true,
    },
    notifyOnFailed: {
        type: Boolean,
        default: true,
    },
    latestCommit: String,
    deployCommit: String,
    isPrivate: {
        type: Boolean,
        default: false,
    },
    availableBranch: [
        {
            type: String,
        },
    ],
    metadata: [
        {
            type: mongoose_1.Schema.Types.Mixed,
        },
    ],
    instanceId: String,
    username: String,
    publicIp: String,
    privateKey: String,
    awsRegion: String,
}, {
    timestamps: true,
});
exports.ProjectModel = (0, mongoose_1.model)("Project", projectSchema);
