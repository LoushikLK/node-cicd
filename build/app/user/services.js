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
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = require("http-errors");
const mongoose_1 = require("mongoose");
const user_1 = require("../../schemas/user");
class UserService {
    handleSelfData(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.UserModel.aggregate([
                    {
                        $match: {
                            _id: new mongoose_1.Types.ObjectId(userId),
                        },
                    },
                    {
                        $lookup: {
                            from: "githubs",
                            localField: "_id",
                            foreignField: "userId",
                            as: "github",
                            pipeline: [
                                {
                                    $project: {
                                        __v: 0,
                                        updatedAt: 0,
                                        createdAt: 0,
                                        accessTokenExpireAt: 0,
                                        refreshTokenExpireAt: 0,
                                        accessToken: 0,
                                        refreshToken: 0,
                                    },
                                },
                            ],
                        },
                    },
                    {
                        $addFields: {
                            github: {
                                $arrayElemAt: ["$github", 0],
                            },
                            isGithubConnected: {
                                $cond: {
                                    if: {
                                        $eq: ["$github", []],
                                    },
                                    then: false,
                                    else: true,
                                },
                            },
                        },
                    },
                    {
                        $project: {
                            __v: 0,
                            updatedAt: 0,
                            password: 0,
                            githubAccessToken: 0,
                            googleAccessToken: 0,
                            googleSecretToken: 0,
                            githubSecretToken: 0,
                            verificationInfo: 0,
                            token: 0,
                        },
                    },
                ]);
                if (!user || user.length === 0)
                    throw new http_errors_1.NotFound("User not found.");
                return user[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = UserService;
