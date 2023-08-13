import { Model, Schema, model } from "mongoose";
import { IGithub } from "../types/github";

const githubSchema = new Schema<IGithub, Model<IGithub>>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    accessPrivate: {
      type: Boolean,
      default: false,
    },
    accessPublic: {
      type: Boolean,
      default: true,
    },
    accessToken: String,
    refreshToken: String,
    githubProfileImage: String,
    githubProfileUrl: String,
    githubUserName: String,
    webHookAdded: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const GithubModel = model<IGithub, Model<IGithub>>(
  "Github",
  githubSchema
);
