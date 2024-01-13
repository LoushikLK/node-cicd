import { NotFound } from "http-errors";
import { Types } from "mongoose";
import { UserModel } from "../../schemas/user";

export default class UserService {
  public async handleSelfData(userId: string) {
    try {
      const user = await UserModel.aggregate([
        {
          $match: {
            _id: new Types.ObjectId(userId),
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

      if (!user || user.length === 0) throw new NotFound("User not found.");

      return user[0];
    } catch (error) {
      throw error;
    }
  }
}
