import { Application } from "express";
import { existsSync, readdirSync } from "fs";
import path from "path";

const routerHandler = (app: Application) => {
  //find all the folder in the app directory and import all the routes
  const allFolders = readdirSync(path.join(__dirname, "..", "app"));

  allFolders.forEach((folder) => {
    //if route file present then import it
    if (
      existsSync(path.join(__dirname, "..", "app", folder, "routes.ts")) ||
      existsSync(path.join(__dirname, "..", "app", folder, "routes.js"))
    ) {
      const router = require(path.join(
        __dirname,
        "..",
        "app",
        folder,
        "routes"
      ));
      app.use("/api/v1/" + folder, new router.default().router);
    }
  });
};

export default routerHandler;
