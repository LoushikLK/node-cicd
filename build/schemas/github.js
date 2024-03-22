"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubModel = void 0;
const mongoose_1 = require("mongoose");
const githubSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    accessPrivate: {
        type: Boolean,
        default: false,
    },
    accessPublic: {
        type: Boolean,
        default: true,
    },
    accessToken: String,
    refreshToken: String,
    githubProfileImage: String,
    githubProfileUrl: String,
    githubUserName: String,
    isDefault: {
        type: Boolean,
        default: false,
    },
    owner: String,
    githubId: String,
    appInstalled: {
        type: Boolean,
        default: false,
    },
    installationId: String,
    metadata: [
        {
            type: mongoose_1.Schema.Types.Mixed,
        },
    ],
    accessTokenExpireAt: {
        type: Date,
    },
    refreshTokenExpireAt: {
        type: Date,
    },
}, {
    timestamps: true,
});
exports.GithubModel = (0, mongoose_1.model)("Github", githubSchema);
