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
const http_errors_1 = require("http-errors");
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const env_config_1 = __importDefault(require("../configs/env.config"));
const user_1 = require("../schemas/user");
class PassportService {
    /**
     * passportGoogleLoginStrategy
     */
    passportGoogleLoginStrategy() {
        return __awaiter(this, void 0, void 0, function* () {
            passport_1.default.use(new passport_google_oauth20_1.Strategy({
                clientID: (0, env_config_1.default)().GoogleClientId,
                clientSecret: (0, env_config_1.default)().GoogleClientSecret,
                callbackURL: (0, env_config_1.default)().GoogleRegisterCallbackURL,
            }, (accessToken, refreshToken, profile, done) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d;
                try {
                    //verify  user
                    const user = yield user_1.UserModel.findOneAndUpdate({
                        email: (_a = profile === null || profile === void 0 ? void 0 : profile.emails) === null || _a === void 0 ? void 0 : _a[0].value,
                    }, {
                        emailVerified: ((_c = (_b = profile === null || profile === void 0 ? void 0 : profile.emails) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.verified) === "true",
                        displayName: profile.displayName,
                        googleAccessToken: accessToken,
                        photoUrl: (_d = profile.photos) === null || _d === void 0 ? void 0 : _d[0].value,
                    }, {
                        runValidators: true,
                        lean: true,
                        upsert: true,
                        new: true,
                    });
                    if (!user)
                        throw new http_errors_1.NotFound("User not found.");
                    done(null, user);
                }
                catch (error) {
                    if (error instanceof Error) {
                        return done(error);
                    }
                    done(new Error("Something went wrong"));
                }
            })));
        });
    }
}
exports.default = PassportService;
