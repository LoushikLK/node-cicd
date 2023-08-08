import express from "express";
import { createServer, Server } from "http";
import envConfig from "./configs/env.config";
import connectToDb from "./db/connect";
import { routerHandler } from "./helpers";
import bottomLevelMiddleware from "./middlewares/bottom.middleware";
import topLevelMiddleware from "./middlewares/toplevel.middleware";
require("dotenv").config();

class App {
  public app: express.Application;
  private PORT = envConfig().APP_PORT || 8000;
  private server: Server;

  constructor() {
    this.app = express();
    this.server = createServer(this.app); //create the http server and bind it to express
    connectToDb(); // connect to database
    topLevelMiddleware(this.app); //setup middleware
    routerHandler(this.app); //setup routes
    bottomLevelMiddleware(this.app); //setup bottom middleware handles (e.g. error ,not found route)
    this.listen(); //start a server by listening to a port
  }

  public listen(): void {
    this.server.listen(this.PORT, () => {
      console.log(`Server started on port ${this.PORT}`);
    });
  }
}
export default new App();
