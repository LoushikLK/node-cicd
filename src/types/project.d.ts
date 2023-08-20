import { Document, ObjectId } from "mongoose";

export enum BuildStatus {
  PENDING,
  SUCCESS,
  FAILED,
  CANCELLED,
}

export interface IProject extends Document {
  userId: ObjectId;
  githubId: ObjectId;
  awsId: ObjectId;
  repositoryUrl: string;
  deployBranch: string;
  defaultBranch: string;
  projectName: string;
  lastBuildStatus: BuildStatus;
  rootDirectory: string;
  buildCommand: string;
  startCommand: string;
  autoDeploy: boolean;
  notifyOnFailed: boolean;
  latestCommit: string;
  deployCommit: string;
  isPrivate: boolean;
  availableBranch: string[];
  metadata: any[];
}
