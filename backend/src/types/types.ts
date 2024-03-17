/* ---- MercadoLibre API Interfaces ---- */

// Products
export interface Products {
  results: Product[];
}

export interface Product {
  id: string;
  title: string;
  category_id: string;
  currency_id: string;
  order_backend: number;
  price: number;
  thumbnail_id: string;
  thumbnail: string;
  condition: string;
  shipping: Shipping;
}

// Product Detail
export interface ProductDetail {
  id: string;
  title: string;
  price: number;
  pictures: Picture[];
  currency_id: string;
  initial_quantity: number;
  thumbnail_id: string;
  thumbnail: string;
  condition: string;
  shipping: Shipping;
  sold_quantity: number;
}

export interface Picture {
  url: string;
}

// Product Description
export interface ProductDescription {
  plain_text: string;
}

// Product Categories
export interface Categories {
  path_from_root: PathFromRoot[];
}

export interface PathFromRoot {
  id: string;
  name: string;
}

/* ---- Response Interfaces ---- */

// GET Product Response
export interface ResponseGetProducts {
  author: Author;
  categories: string[];
  items: Item[];
}

export interface Item {
  id: string;
  title: string;
  price: Price;
  picture: string;
  condition: string;
  free_shipping: boolean;
}

// GET Product Detail Response
export interface ResponseGetProductDetails {
  author: Author;
  item: DetailItem;
}

export interface DetailItem {
  id: string;
  title: string;
  price: Price;
  picture: string;
  condition: string;
  free_shipping: boolean;
  sold_quantity: number;
  description: string;
}

// Common types
export interface Author {
  name: string;
  lastname: string;
}

export interface Price {
  currency: string;
  amount: number;
  decimals: number;
}

export interface Shipping {
  free_shipping: boolean;
}
