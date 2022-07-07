export interface IProduct extends Document {
  Type: number;
  Name: string;
  BrandId: string;
  Image: string;
  CategoryId: string;
  Description: string;
}
