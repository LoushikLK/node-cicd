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
const services_1 = __importDefault(require("./services"));
class HookController {
    constructor() {
        this.service = new services_1.default();
    }
    /**
     * handleHooks
     *
     */
    handleHooks(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // handle hooks for different event
                switch (req === null || req === void 0 ? void 0 : req.headers["x-github-event"]) {
                    case "push":
                        yield this.service.handlePushEvent(req.body);
                        break;
                    case "installation":
                        if (((_a = req.body) === null || _a === void 0 ? void 0 : _a.action) === "create") {
                            yield this.service.handleInstallationCreateEvent(req.body);
                        }
                        else if (((_b = req.body) === null || _b === void 0 ? void 0 : _b.action) === "delete") {
                            yield this.service.handleInstallationDeleteEvent(req.body);
                        }
                        break;
                    default:
                        break;
                }
                yield this.service.handlePushEvent(req.body);
                //send response to client
                res.json({
                    msg: "Success",
                    success: true,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = HookController;
