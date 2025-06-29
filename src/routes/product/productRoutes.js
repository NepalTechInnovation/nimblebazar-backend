const express = require('express');
const router = express.Router();
const productController = require('../../controllers/product/productController');
const { validate } = require('../../middleware/validateMiddleware');
const { validateProduct } = require('../../validators/product/productValidator');
const { authorizeRoles, authorize } = require('../../middleware/authorize');
const Roles = require('../../constants/roleEnum');
const productAttributeController = require('../../controllers/product/productAttributeController');
const { validateProductAttribute } = require('../../validators/product/productAttributeValidator');
const productAttributeValueController = require('../../controllers/product/productAttributeValueController');
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

//product attribute
router.post('/add-product-attribute', authorize, authorizeRoles('SUPERADMIN'), validate, validateProductAttribute, productAttributeController.createProductAttribute);
router.get('/fetch-attribute-by-id/:id', productAttributeController.getAttributeById);
router.get('/fetch-attribute', productAttributeController.getAllAttributes);
router.delete('/delete-attribute/:id', productAttributeController.deleteAttribute);

//product product_attribute_values
router.post('/add-product-attribute-value', authorize, authorizeRoles('SUPERADMIN'), validate, validateProductAttribute, productAttributeValueController.createProductAttributeValue);
router.get('/fetch-attribute-by-id/:id', productAttributeValueController.getAttributeById);
router.get('/fetch-attribute', productAttributeValueController.getAllProductAttributeValue);
router.delete('/delete-attribute/:id', productAttributeValueController.deleteAttribute);
module.exports = router;
