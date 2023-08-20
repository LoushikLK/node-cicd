import { Model, Schema, model } from "mongoose";
import { IBuild } from "../types/build";

const buildSchema = new Schema<IBuild, Model<IBuild>>(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    buildCommit: String,
    reason: String,
    status: {
      type: Schema.Types.Mixed,
      enum: ["PENDING", "SUCCESS", "FAILED", "CANCELLED"],
      default: "PENDING",
    },
    startTime: {
      type: Date,
      default: new Date(),
    },
    endTime: {
      type: Date,
      default: new Date(),
    },
    buildOutPut: [
      {
        type: String,
      },
    ],
    buildStartedBy: String,

    metadata: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

export const BuildModel = model<IBuild, Model<IBuild>>("Build", buildSchema);
