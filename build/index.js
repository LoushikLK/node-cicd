"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const env_config_1 = __importDefault(require("./configs/env.config"));
const connect_1 = __importDefault(require("./db/connect"));
const routeParser_helper_1 = __importDefault(require("./helpers/routeParser.helper"));
const bottom_middleware_1 = __importDefault(require("./middlewares/bottom.middleware"));
const toplevel_middleware_1 = __importDefault(require("./middlewares/toplevel.middleware"));
require("dotenv").config();
const app = (0, express_1.default)();
const PORT = (0, env_config_1.default)().APP_PORT || 8000;
const server = (0, http_1.createServer)(app);
(0, connect_1.default)(); // connect to database
(0, toplevel_middleware_1.default)(app); //setup middleware
(0, routeParser_helper_1.default)(app); //setup routes
(0, bottom_middleware_1.default)(app); //setup bottom middleware handles (e.g. error ,not found route)
// server.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });
exports.default = server;
