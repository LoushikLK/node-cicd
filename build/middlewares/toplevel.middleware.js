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
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const express_session_1 = __importDefault(require("express-session"));
const helmet_1 = __importDefault(require("helmet"));
const passport_1 = __importDefault(require("passport"));
const env_config_1 = __importDefault(require("../configs/env.config"));
const passport_middleware_1 = __importDefault(require("./passport.middleware"));
const topLevelMiddleware = (app) => {
    app.use((0, cors_1.default)({
        origin: "*",
        methods: "GET,POST,PUT,DELETE,PATCH",
        credentials: true,
    }));
    app.use(express_1.default.urlencoded({
        extended: true,
        limit: "50mb",
    }));
    app.use((0, express_fileupload_1.default)());
    app.use(express_1.default.json());
    //create session
    app.use((0, express_session_1.default)({
        secret: (0, env_config_1.default)().PassportSessionSecret,
        resave: false,
        saveUninitialized: false, // don't create session until something stored
    }));
    app.use(passport_1.default.initialize());
    //authenticate using session
    app.use(passport_1.default.authenticate("session"));
    //load passport strategies
    new passport_middleware_1.default().passportGoogleLoginStrategy();
    //passport middleware to serialize and deserialize
    passport_1.default.serializeUser((user, done) => {
        done(null, user);
    });
    passport_1.default.deserializeUser((user, done) => __awaiter(void 0, void 0, void 0, function* () {
        done(null, user);
    }));
    app.use((0, helmet_1.default)());
    app.use((req, res, next) => {
        var _a;
        console.table([
            {
                METHOD: req.method,
                PATH: req.path,
                ip: req.ip,
                AGENT: (_a = req === null || req === void 0 ? void 0 : req.get("user-agent")) === null || _a === void 0 ? void 0 : _a.split("/")[0],
            },
        ]);
        next();
    });
};
exports.default = topLevelMiddleware;
