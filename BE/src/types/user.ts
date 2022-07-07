import { Document } from "mongoose";

export interface IUser extends Document {
  FullName: string;
  Role: string;
  Username: string;
  Password: string;
  Email: string;
}
