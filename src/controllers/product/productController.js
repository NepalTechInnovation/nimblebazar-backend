const productService = require('../../services/product/productService');
const ApiError = require('../../utils/ApiError');
const ApiResponse = require('../../utils/ApiResponse');
const asyncWrapper = require("../../middleware/asyncWrapper");
const Messages = require('../../constants/messages');


const createProduct = asyncWrapper(async (req, res, next) => {
  const product = await productService.createProduct(req.body, req.user.id);

  res
    .status(200)
    .json(new ApiResponse(200, Messages.PRODUCT.CREATE_SUCCESS, product));
});



const getAllProducts = asyncWrapper(async (req, res,) => {

  const data = await productService.getAllProducts(req.query);
  res.status(200).json(new ApiResponse(200, Messages.PRODUCT.PRODUCT_FETCH_SUCCESS, data, "data"));

});

const getProductById = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await productService.getProductById(productId);

    if (!product) {
      throw new ApiError(404, 'Product not found');
    }

    res.status(200).json(new ApiResponse(200, 'Product fetched successfully', product));
  } catch (error) {
    next(error);
  }
};


const getProductBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const product = await productService.getProductBySlug(slug);

    if (!product) {
      throw new ApiError(404, 'Product not found');
    }

    res.status(200).json(new ApiResponse(200, 'Product fetched successfully', product));
  } catch (error) {
    next(error);
  }
};

const updateProduct = asyncWrapper(async (req, res) => {
  const updatedProduct = await productService.updateProduct(req.params.productId, req.body, req.user.id);

  res
    .status(200)
    .json(new ApiResponse(200, Messages.PRODUCT.UPDATE_SUCCESS, updatedProduct));
});


const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await productService.deleteProduct(id);
    res.status(200).json(new ApiResponse(200, Messages.PRODUCT.DELETE_SUCCESS));
  } catch (error) {
    next(error);
  }
};
const searchProduct = asyncWrapper(async (req, res,) => {
  const { query, sortBy,orderDirection,categoryId } = req.query;
  const products = await productService.searchProducts({ query, sortBy ,orderDirection, categoryId});
  res.status(200).json(new ApiResponse(200, Messages.PRODUCT.PRODUCT_FETCH_SUCCESS, products, "products"));

});

const fetchProductByTag = asyncWrapper(async (req, res,) => {
  const products = await productService.fetchProductsByTag(req, res);
  res.status(200).json(new ApiResponse(200, Messages.PRODUCT.PRODUCT_FETCH_SUCCESS, products, "products"));

});

const fetchProductByCategory = asyncWrapper(async (req, res,) => {
  const products = await productService.fetchProductsByCategorySlug (req, res);
  res.status(200).json(new ApiResponse(200, Messages.PRODUCT.PRODUCT_FETCH_SUCCESS, products, "products"));

});

const fetchProductBySubcategory = asyncWrapper(async (req, res,) => {
  const products = await productService.fetchProductsBySubcategorySlug (req, res);
  res.status(200).json(new ApiResponse(200, Messages.PRODUCT.PRODUCT_FETCH_SUCCESS, products, "products"));

});

const fetchAllActiveProducts = asyncWrapper(async (req, res,) => {

  const data = await productService.getAllActiveProducts(req.query);
  res.status(200).json(new ApiResponse(200, Messages.PRODUCT.PRODUCT_FETCH_SUCCESS, data, "data"));

});

const fetchAllDeleteProducts = asyncWrapper(async (req, res,) => {

  const data = await productService.getAllDeleteProducts(req.query);
  res.status(200).json(new ApiResponse(200, Messages.PRODUCT.PRODUCT_FETCH_SUCCESS, data, "data"));

});



module.exports = {
  createProduct,
  updateProduct,
  getAllProducts,
  getProductById,
  getProductBySlug,
  deleteProduct,
  searchProduct,
  fetchProductByTag,
  fetchProductByCategory,
  fetchProductBySubcategory,
  fetchAllActiveProducts,
  fetchAllDeleteProducts
};