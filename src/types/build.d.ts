import { Document, ObjectId } from "mongoose";
import { BuildStatus } from "./project";

export interface IBuild extends Document {
  projectId: ObjectId;
  buildCommit: string;
  reason: string;
  status: BuildStatus;
  startTime: Date;
  endTime: Date;
  buildOutPut: string[];
  buildStartedBy: string;
  metadata: any;
}
