import {
  Categories,
  Item,
  PathFromRoot,
  Product,
  ProductDescription,
  ProductDetail,
  Products,
  ResponseGetProductDetails,
  ResponseGetProducts,
} from "../types/types";

export const formatProductsResponse = (
  products: Products,
  categories: Categories
): ResponseGetProducts => {
  const formattedProducts = {
    author: {
      name: "Kevin",
      lastname: "Nakandakare",
    },
    categories: categories.path_from_root.map(
      (path: PathFromRoot) => path.name
    ),
    items: products.results.map((product: Product) =>
      getFormattedProduct(product)
    ),
  };

  return formattedProducts;
};

export const formatProductDetailResponse = (
  productDetail: ProductDetail,
  description: ProductDescription
): ResponseGetProductDetails => {
  const {
    id,
    title,
    currency_id,
    price,
    thumbnail,
    condition,
    shipping,
    sold_quantity,
  } = productDetail;

  return {
    author: {
      name: "Kevin",
      lastname: "Nakandakare",
    },
    item: {
      id,
      title,
      price: {
        currency: currency_id,
        amount: Math.trunc(price),
        decimals: getDecimals(price),
      },
      picture: productDetail.pictures[0]?.url || thumbnail,
      condition,
      free_shipping: shipping.free_shipping,
      sold_quantity,
      description: description.plain_text,
    },
  };
};

export const getFormattedProduct = (product: Product): Item => {
  const { id, title, currency_id, price, thumbnail, condition, shipping } =
    product;
  const decimals = getDecimals(price);

  return {
    id,
    title,
    price: {
      currency: currency_id,
      amount: Math.trunc(price),
      decimals,
    },
    picture: thumbnail,
    condition,
    free_shipping: shipping.free_shipping,
  };
};

const getDecimals = (price: number): number => {
  return +price.toString().split(".")[1] || 0;
};
