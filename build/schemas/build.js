"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildModel = void 0;
const mongoose_1 = require("mongoose");
const buildSchema = new mongoose_1.Schema({
    projectId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Project",
    },
    buildCommit: String,
    reason: String,
    status: {
        type: mongoose_1.Schema.Types.Mixed,
        enum: ["PENDING", "SUCCESS", "FAILED", "CANCELLED"],
        default: "PENDING",
    },
    startTime: {
        type: Date,
        default: new Date(),
    },
    endTime: {
        type: Date,
        default: new Date(),
    },
    buildOutPut: [
        {
            type: String,
        },
    ],
    buildStartedBy: String,
    metadata: {
        type: mongoose_1.Schema.Types.Mixed,
    },
}, {
    timestamps: true,
});
exports.BuildModel = (0, mongoose_1.model)("Build", buildSchema);
