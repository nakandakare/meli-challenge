import { Request, Response } from "express";
import { MeliService } from "../services/product.service";
import {
  formatProductDetailResponse,
  formatProductsResponse,
} from "../utils/utils";
import {
  Categories,
  ProductDescription,
  ProductDetail,
  Products,
} from "../types/types";

// api/items?q:query
export const getProducts = async (req: Request, res: Response) => {
  const { search } = req.query;

  if (!search)
    return res.status(400).json({
      success: false,
      message: "No search parameter found",
      result: null,
    });

  try {
    const productsResult: Products = await MeliService.getAllProducts(
      search as string
    );
    const categoriesResult: Categories = await MeliService.getProductCategories(
      productsResult.results[0]?.category_id as string
    );

    const formattedResponse = formatProductsResponse(
      productsResult,
      categoriesResult
    );

    return res.json({ success: true, results: formattedResponse });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error getting products",
      results: null,
    });
  }
};

// api/items/:id
export const getProductDetail = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id)
    return res
      .status(400)
      .json({ success: false, message: "No id parameter found", result: null });

  try {
    const [productDetailResult, productDescriptionResult]: [
      ProductDetail,
      ProductDescription
    ] = await Promise.all([
      MeliService.getProductDetail(id),
      MeliService.getProductDescription(id),
    ]);

    const formattedResponse = formatProductDetailResponse(
      productDetailResult,
      productDescriptionResult
    );

    return res.json({ success: true, results: formattedResponse });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error getting product detail",
      results: null,
    });
  }
};
