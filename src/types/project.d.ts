import { Document, ObjectId } from "mongoose";

export default interface IProject extends Document {
  userId: ObjectId;
  githubId: ObjectId;
  awsId: ObjectId;
  repositoryUrl: string;
  repositoryId: string;
  deployBranch: string;
  defaultBranch: string;
  projectName: string;
  lastBuildStatus: "PENDING" | "SUCCESS" | "CANCELLED" | "FAILED";
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
