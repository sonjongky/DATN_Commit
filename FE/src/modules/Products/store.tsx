import React from 'react';
import { action, makeAutoObservable, observable } from 'mobx';
import { Typography } from '@mui/material';

import { Brand, Category, CustomerCode, Product, ProductCode, ProductDetail } from '../../types';
import { $get } from '../../infra/http';
import { asyncAction } from '../../infra/mobx';
import useAsyncFunction from '../../infra/useAsyncFunction';

const INDEX_OF_OTHER_CATEGORY = 2;

const defaultProductCode: ProductCode = {
    Id: '',
    Code: '',
    Name: '',
    PackagingType: '',
    ProductId: '',
    CategoryId: '',
    ImagePath: '',
    Weight: 0,
    Millimeter: 0,
    OrderType: 0,
    Description: '',
    Details: '',
    BrandId: '',
};

class ProductStore {
    getRequestedDateDeliveryOfCustomerCode() {
        throw new Error('Method not implemented.');
    }
    @observable products: Product[] = [];

    @observable allProducts: Product[] = [];

    @observable defaultCustomerCodeId = '';

    @observable productCode: ProductCode = defaultProductCode;

    @observable
    product: ProductDetail = {
        Id: '',
        Name: '',
        Description: '',
        Details: '',
        BrandId: '',
        IsFavourite: false,
        CategoryId: '',
        Images: [],
        Type: 0,
    };

    @observable currentBrandName = 'Non-Brand';

    @observable currentCategoryName = 'Non-Category';

    @observable customerCodes: CustomerCode[] = [];

    @observable categories: Category[] = [];

    @observable brands: Brand[] = [];

    @observable selectedBrands: string[] = [];

    @observable selectedCategories: string[] = [];

    @observable addedDaysForRDD = 0;
    constructor() {
        makeAutoObservable(this);
    }

    @action
    public getCategories() {
        this.categories = [
            { Id: '1', Name: 'Heo' },
            { Id: '2', Name: 'Gà' },
            { Id: '3', Name: 'Vịt' },
        ];
    }

    @action
    public getBrands() {
        this.brands = [
            { Id: '1', Name: 'De Hues' },
            { Id: '2', Name: 'Mekong' },
            { Id: '3', Name: 'Comfeed' },
        ];
    }

    @asyncAction
    public *getAvailableProducts() {
        const response: Product[] = yield $get(`/products`);
        console.log('response', response);

        this.allProducts = [...response.sort((a, b) => a.Name.localeCompare(b.Name))];
        console.log('da chay ts day');

        this.filterProduct();
        console.log('this.allProducts', this.allProducts);
    }

    @asyncAction
    public *getProductById(productId: string) {
        const getQuery = `?id=${productId}`;
        const response: ProductDetail = yield $get(`/product/ById${getQuery}`);
        this.product = response;
    }

    @action
    public setCurrentBrandAndCategoryName(
        brand: Brand,
        category: Category,
        ProductDetail: ProductDetail | ProductCode,
    ) {
        brand = this.brands.filter((item) => item.Id === ProductDetail.BrandId)[0];
        category = this.categories.filter((item) => item.Id === ProductDetail.CategoryId)[0];
        this.currentBrandName = brand.Name;
        this.currentCategoryName = category.Name;
    }

    @action
    private arrangeCategoryList(response: Category[]) {
        const fromIndex = INDEX_OF_OTHER_CATEGORY;
        const element = response.splice(fromIndex, 1)[0];
        const toIndex = response.length;
        response.splice(toIndex, 0, element);
        this.categories = [...response];
    }

    @action
    public setSelectedBrands(value: string) {
        const currentIndex = this.selectedBrands.indexOf(value);
        const newSelectedBrands = [...this.selectedBrands];
        if (currentIndex === -1) {
            newSelectedBrands.push(value);
        } else newSelectedBrands.splice(currentIndex, 1);
        this.selectedBrands = [...newSelectedBrands];
        this.filterProduct();
    }

    @action
    public setSelectedCategories(value: string) {
        const currentIndex = this.selectedCategories.indexOf(value);
        const newSelectedCategories = [...this.selectedCategories];
        if (currentIndex === -1) {
            newSelectedCategories.push(value);
        } else newSelectedCategories.splice(currentIndex, 1);
        this.selectedCategories = [...newSelectedCategories];
        this.filterProduct();
    }

    @action
    public filterProduct() {
        if (this.selectedBrands.length === 0 && this.selectedCategories.length === 0) {
            this.products = [...this.allProducts];
            return;
        }
        this.products = this.allProducts.filter((item) => {
            const brandIdIndex = this.selectedBrands.indexOf(item.BrandId);
            const categoryIdIndex = this.selectedCategories.indexOf(item.CategoryId);
            const isNonFilteredItem = brandIdIndex !== -1 && categoryIdIndex !== -1;
            const isFilteredByBrandAndCate =
                (this.selectedCategories.length === 0 && brandIdIndex !== -1) ||
                (this.selectedBrands.length === 0 && categoryIdIndex !== -1);
            if (isNonFilteredItem || isFilteredByBrandAndCate) return item;
        });
    }
}

const ProductsStoreContext = React.createContext({} as { store: ProductStore });
let store: ProductStore | null = new ProductStore();

export const ProductsStoreProvider = (props: any) => {
    const { children } = props;
    if (!store) {
        store = new ProductStore();
    }

    return <ProductsStoreContext.Provider value={{ store }}>{children}</ProductsStoreContext.Provider>;
};

export const useProductStore = () => React.useContext(ProductsStoreContext);
