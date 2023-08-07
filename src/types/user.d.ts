import { Document } from "mongoose";

export interface IUser extends Document {
  displayName: string;
  email: string;
  gender: "MALE" | "FEMALE" | "OTHER" | "NONE";
  dateOfBirth: Date;
  phoneNumber: string;
  countryCode: string;
  country: string;
  state: string;
  district: string;
  pinCode: string;
  address: string;
  password: string;
  token: string;
  verificationInfo: {
    otp: number;
    validity: number;
  };
  photoUrl: string;
  photoPath: string;
  fcmTokens: {
    web: string;
    android: string;
    ios: string;
  };
  role: "SUPER_ADMIN" | "ADMIN" | "EDITOR";
  isLoggedIn: boolean;
  isOnline: boolean;
  blockStatus: "BLOCKED" | "UNBLOCKED";
  geoCode?: {
    LONG: string;
    LAT: string;
  }[];
  phoneNumberVerified: boolean;
  lastLoginTime: Date;
  emailVerified: boolean;
  googleId: string;
  githubId: string;
  googleAccessToken: string;
  githubAccessToken: string;
  googleSecretToken: string;
  githubSecretToken: string;
  encryptPassword(rawPassword: string): string;
  authenticate(rawPassword: string): boolean;
}
