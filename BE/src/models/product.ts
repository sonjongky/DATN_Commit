import { IUser } from "../types/user";
import { model, Schema } from "mongoose";
import { IProduct } from "../types/product";

const productSchema: Schema = new Schema(
  {
    Type: {
      type: Number,
    },
    Name: {
      type: String,
    },

    BrandId: {
      type: String,
    },

    Image: { type: String },

    CategoryId: {
      type: String,
    },
    Description: {
      type: String,
    },
    TrongLuongBao: { type: String },
    NoiSanXuat: { type: String },
    KichThuocHat: { type: String },
    SoLuong: { type: String },
    GiaTien: { type: String },
  },
  { timestamps: true }
);

export default model<IProduct>("Product", productSchema);
