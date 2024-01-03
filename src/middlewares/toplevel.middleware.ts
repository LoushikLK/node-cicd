import cors from "cors";
import express, { Application } from "express";
import fileUpload from "express-fileupload";
import session from "express-session";
import helmet from "helmet";
import passport from "passport";
import envConfig from "../configs/env.config";
import PassportService from "./passport.middleware";

const topLevelMiddleware = (app: Application) => {
  app.use(
    cors({
      origin: "*",
      methods: "GET,POST,PUT,DELETE,PATCH",
      credentials: true,
    })
  );
  app.use(
    express.urlencoded({
      extended: true,
      limit: "50mb",
    })
  );

  app.use(fileUpload());
  app.use(express.json());

  //create session
  app.use(
    session({
      secret: envConfig().PassportSessionSecret,
      resave: false, // don't save session if unmodified
      saveUninitialized: false, // don't create session until something stored
    })
  );

  app.use(passport.initialize());

  //authenticate using session
  app.use(passport.authenticate("session"));

  //load passport strategies

  new PassportService().passportGoogleLoginStrategy();

  //passport middleware to serialize and deserialize
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser(async (user, done) => {
    done(null, user as any);
  });

  app.use(helmet());

  app.use((req, res, next) => {
    console.table([
      {
        METHOD: req.method,
        PATH: req.path,
        ip: req.ip,
        AGENT: req?.get("user-agent")?.split("/")[0],
      },
    ]);

    next();
  });
};

export default topLevelMiddleware;
