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
class UserController {
    constructor() {
        this.service = new services_1.default();
    }
    /**
     * getSelf
     *
     */
    getSelf(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // handle hooks for different event
                const data = yield this.service.handleSelfData((_a = req === null || req === void 0 ? void 0 : req.currentUser) === null || _a === void 0 ? void 0 : _a._id);
                //send response to client
                res.json({
                    msg: "Success",
                    success: true,
                    data: { data },
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = UserController;
