import { Document, ObjectId } from "mongoose";
import { IUser } from "./user";

export interface IGithub extends Document {
  userId: ObjectId;
  user: IUser;
  accessToken: string;
  refreshToken: string;
  githubUserName: string;
  githubProfileUrl: string;
  githubProfileImage: string;
  accessPrivate: boolean;
  accessPublic: boolean;
  isDefault: boolean;
  owner: string;
  appInstalled: boolean;
  metadata: any[];
  installationId: string;
  accessTokenExpireAt: Date;
  refreshTokenExpireAt: Date;
  githubId: string;
}
