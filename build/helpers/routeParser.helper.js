"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const routerHandler = (app) => {
    //find all the folder in the app directory and import all the routes
    const allFolders = (0, fs_1.readdirSync)(path_1.default.join(__dirname, "..", "app"));
    allFolders.forEach((folder) => {
        //if route file present then import it
        if ((0, fs_1.existsSync)(path_1.default.join(__dirname, "..", "app", folder, "routes.ts")) ||
            (0, fs_1.existsSync)(path_1.default.join(__dirname, "..", "app", folder, "routes.js"))) {
            const router = require(path_1.default.join(__dirname, "..", "app", folder, "routes"));
            app.use("/api/v1/" + folder, new router.default().router);
        }
    });
};
exports.default = routerHandler;
