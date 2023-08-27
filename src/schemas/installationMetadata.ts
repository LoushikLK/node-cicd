import { Schema, model } from "mongoose";

const metadataSchema = new Schema(
  {
    metadata: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

export const MetadataModel = model("Installation", metadataSchema);
