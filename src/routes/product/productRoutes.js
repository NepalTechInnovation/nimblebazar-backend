const express = require('express');
const router = express.Router();
const productController = require('../../controllers/product/productController');
const { validate } = require('../../middleware/validateMiddleware');
const { validateProduct } = require('../../validators/product/productValidator');
const { authorizeRoles, authorize } = require('../../middleware/authorize');
const Roles = require('../../constants/roleEnum');


router.post('/create-product', authorize, authorizeRoles('SUPERADMIN'), validate, validateProduct, productController.createProduct);
router.get('/fetch-all-products', productController.getAllProducts);
router.get('/fetch-all-active-products', productController.fetchAllActiveProducts);
router.get('/fetch-product-by-productId/:productId', validate, productController.getProductById);
router.get('/fetch-product-by-slug/:slug', productController.getProductBySlug);
router.put('/update-product/:productId', authorize, authorizeRoles(Roles.SUPER_ADMIN), validate, productController.updateProduct);
router.put('/delete-product/:id', authorize, authorizeRoles('SUPERADMIN'), productController.deleteProduct);
router.get('/fetch-product-by-tag/:tag', productController.fetchProductByTag);
router.get('/fetch-product-by-category/:categoryId', productController.fetchProductByCategory);
router.get('/fetch-product-by-subcategory/:categoryId', productController.fetchProductBySubcategory);
router.get('/search-product', productController.searchProduct);
router.get('/fetch-all-delete-products', authorize, authorizeRoles(Roles.SUPER_ADMIN), productController.fetchAllDeleteProducts);
module.exports = router;
