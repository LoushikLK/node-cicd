import { Model, Schema, model } from "mongoose";
import { IAws } from "../types/aws";

const awsSchema = new Schema<IAws, Model<IAws>>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    instanceId: String,
    username: String,
    publicIp: String,
    privateKey: String,
    awsRegion: String,
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const AwsModel = model<IAws, Model<IAws>>("Aws", awsSchema);
