export type Product = {
    _id: string;
    Type: number;
    Name: string;
    Image: string;
    BrandId: string;
    CategoryId: string;
    Description: string;
    TrongLuongBao: string;
    NoiSanXuat: string;
    KichThuocHat: string;
    SoLuong: string;
    GiaTien: string;
};

export type CustomerCode = {
    Id: string;
    ERPCustomerCode: string;
    AddedDaysForRDD: number;
};
export type Category = {
    Id: string;
    Name: string;
};
export type Brand = {
    Id: string;
    Name: string;
};
export type ProductDetail = {
    Id: string;
    Name: string;
    Description: string;
    Details: string;
    BrandId: string;
    CategoryId: string;
    Images: string[];
    IsFavourite: boolean;
    Type: number;
};
export enum ProductDescriptionKey {
    PACKING_TYPE = 'PackingType',
    PELLET_SIZE = 'PelletSize',
}

export type ProductCode = {
    Id: string;
    Code: string;
    Name: string;
    PackagingType: string;
    ProductId: string;
    BrandId: string;
    CategoryId: string;
    ImagePath: string;
    Description: string;
    Details: string;
    Weight: number;
    Millimeter: number;
    OrderType: number;
};
