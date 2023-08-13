import { Model, Schema, model } from "mongoose";
import { IProject } from "../types/project";

const projectSchema = new Schema<IProject, Model<IProject>>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    githubId: {
      type: Schema.Types.ObjectId,
      ref: "Github",
    },
    awsId: {
      type: Schema.Types.ObjectId,
      ref: "Aws",
    },
    repositoryUrl: String,
    deployBranch: String,
    defaultBranch: String,
    projectName: String,
    lastBuildStatus: String,
    rootDirectory: String,
    buildCommand: String,
    startCommand: String,
    autoDeploy: {
      type: Boolean,
      default: true,
    },
    notifyOnFailed: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ProjectModel = model<IProject, Model<IProject>>(
  "Project",
  projectSchema
);
