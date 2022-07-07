import { IProduct } from "./../../types/product";
import Product from "../../models/product";
import { Response, Request } from "express";

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products: IProduct[] = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productFind: IProduct | null = await Product.findById(req.params.id);

    res.status(200).json(productFind);
  } catch (error) {
    throw error;
  }
};

export const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body;

    const product = new Product({
      Name: body.Name,
      BrandId: body.BrandId,
      CategoryId: body.CategoryId,
      Image:
        "https://honghafeed.com.vn/Uploads/images/Sanpham/T%C4%82CN%20Mi%E1%BB%81n%20B%E1%BA%AFc/Heo/1110P%205kg.png",
      GiaTien: body.GiaTien,
      KichThuocHat: body.KichThuocHat,
      NoiSanXuat: body.NoiSanXuat,
      SoLuong: body.SoLuong,
      TrongLuongBao: body.TrongLuongBao,
    });

    const newProduct: IProduct = await product.save();

    res.status(201).json({ message: "Product added" });
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const updateTodo = await Product.findByIdAndUpdate({ _id: id }, body);
    res.status(200).json({
      message: "Todo updated",
    });
  } catch (error) {
    throw error;
  }
};
