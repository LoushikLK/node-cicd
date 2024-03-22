"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsModel = void 0;
const mongoose_1 = require("mongoose");
const awsSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    instanceId: String,
    username: String,
    publicIp: String,
    privateKey: String,
    awsRegion: String,
    isDefault: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.AwsModel = (0, mongoose_1.model)("Aws", awsSchema);
