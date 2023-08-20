import { createAppAuth } from "@octokit/auth-app";
import { readFileSync } from "fs";
import { Octokit } from "octokit";
import path from "path";
import envConfig from "./env.config";
const fetch = require("node-fetch");

const octokitInstance = (installationId: string) => {
  const PRIVATE_KEY = readFileSync(
    path.resolve(__dirname, "../../github-private-key.pem"),
    "utf8"
  );

  // Create Octokit instance with authentication
  const octokit = new Octokit({
    authStrategy: createAppAuth,
    request: fetch,
    auth: {
      appId: envConfig().GithubAppId,
      privateKey: PRIVATE_KEY,
      installationId: parseInt(installationId),
    },
  });

  return octokit;
};

export default octokitInstance;
