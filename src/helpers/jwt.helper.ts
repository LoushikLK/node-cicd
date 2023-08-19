import { InternalServerError } from "http-errors";
import jwt, { SignOptions } from "jsonwebtoken";
import envConfig from "../configs/env.config";

export const generateToken = async (
  payload: string | object,
  options?: SignOptions
) => {
  const jwtSecret = envConfig().APP_JWT_SECRET;

  if (!jwtSecret) throw new InternalServerError("JWT secret is not found.");

  return jwt.sign(payload, jwtSecret, {
    expiresIn: options?.expiresIn || "1d",
  });
};
export const verifyToken = async (token: string): Promise<any> => {
  const jwtSecret = envConfig().APP_JWT_SECRET;

  if (!jwtSecret) throw new InternalServerError("JWT secret is not found.");

  return jwt.verify(token?.split(" ")[1], jwtSecret);
};
