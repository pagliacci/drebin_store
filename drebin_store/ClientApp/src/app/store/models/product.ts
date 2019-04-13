// import { Url } from 'url';

export class Product {
    id: number;
    title: string;
    price: number;
    iconUrl: string;
    description: string;
    previewUrl: string;
    numberInStock: number;

    constructor(product?: Product) {
        if (product != null) {
            this.id = product.id;
            this.title = product.title;
            this.price = product.price;
            this.iconUrl = product.iconUrl;
            this.description = product.description;
            this.previewUrl = product.previewUrl;
            this.numberInStock = product.numberInStock;
        }
    }
}
