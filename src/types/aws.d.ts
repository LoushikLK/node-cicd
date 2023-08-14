import { Document, ObjectId } from "mongoose";
import { IUser } from "./user";

export interface IAws extends Document {
  userId: ObjectId;
  user: IUser;
  instanceId: string;
  username: string;
  publicIp: string;
  privateKey: string;
  awsRegion: string;
  isDefault: boolean;
}
