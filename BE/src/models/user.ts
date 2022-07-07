import { IUser } from "../types/user";
import { model, Schema } from "mongoose";

const userSchema: Schema = new Schema(
  {
    Username: {
      type: String,
      required: true,
    },
    Fullname: {
      type: String,
      required: true,
    },

    Password: {
      type: String,
      required: true,
    },

    Email: { type: String, required: true },

    Role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
