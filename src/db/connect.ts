import * as mongoose from "mongoose";
import envConfig from "../configs/env.config";

const connectToDb = () => {
  const mongoUrl = envConfig().MongoConnectionURI;
  mongoose
    .connect(mongoUrl)
    .then(() => {
      console.log("DB connected successfully");
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

export default connectToDb;
