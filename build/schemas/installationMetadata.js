"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataModel = void 0;
const mongoose_1 = require("mongoose");
const metadataSchema = new mongoose_1.Schema({
    metadata: {
        type: mongoose_1.Schema.Types.Mixed,
    },
}, {
    timestamps: true,
});
exports.MetadataModel = (0, mongoose_1.model)("Installation", metadataSchema);
