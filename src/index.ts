import express from "express";
import { createServer, Server } from "http";
import envConfig from "./configs/env.config";
import connectToDb from "./db/connect";
import routerHandler from "./helpers/routeParser.helper";
import bottomLevelMiddleware from "./middlewares/bottom.middleware";
import topLevelMiddleware from "./middlewares/toplevel.middleware";
require("dotenv").config();

const app: express.Application = express();
const PORT = envConfig().APP_PORT || 8000;
const server: Server = createServer(app);

connectToDb(); // connect to database
topLevelMiddleware(app); //setup middleware
routerHandler(app); //setup routes
bottomLevelMiddleware(app); //setup bottom middleware handles (e.g. error ,not found route)

// server.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });

export default server;
