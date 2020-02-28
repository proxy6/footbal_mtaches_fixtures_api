export interface Product {
    id: string;
    price: number;
}

export interface Category {
    id: string;
    products:  Product[]
}

export interface PepperAPIResponse {
    categories: Category[]
}