const express = require("express");
const cors = require("cors");

require("dotenv").config();

// const authorize = require("./middleware/authorize");
const errorHandler = require('./middleware/errorHandler');
const passport = require("passport");
const app = express();
app.use(errorHandler);
require("./services/auth/passport");
app.use(passport.initialize());
// Enable CORS
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,PATCH,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Increase request size limit
app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ limit: "50mb", extended: true })); 
app.get("/", (req, res) => {
  res.redirect("https://himalaygarment.com/");
});

// app.use(authorize);
// Import routes
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/product/categoryRoute");
const subCategoryRoutes = require("./routes/product/subcategoryRoute");
const reviewRoutes = require("./routes/review/reviewRoute");
const bannerRoutes = require("./routes/banner/bannerRoute");
const blogRoutes = require("./routes/blog/blogRoute");
const blogCategoryRoutes = require("./routes/blog/category/blogCategoryRoute");
const tagRoutes = require("./components/tag/route");
const couponRoutes = require("./routes/coupon/couponRoute");
const cartRoutes = require("./routes/product/cartRoute");
const productRoutes = require("./routes/product/productRoutes");
const superAdminRoutes = require("./routes/superAdmin/superAdminRoutes");
const orderRoutes = require("./routes/order/orderRoute");
const shippingAddressRoute = require("./routes/shippingAddress/shippingAddressRoute");
const paymentRoutes = require("./routes/payment/paymentRoute");
const wishlistRoutes = require("./routes/wishlist/wishlistRoute");
const newsletterRoutes = require("./routes/newsletter/newsletterRoute");
const uploadRoutes = require("./routes/upload/uploadRoute");
const siteSettingRoute = require("./routes/siteSetting/siteSettingRoute.js");
const testimonialRoute = require("./routes/testimonial/testimonialRoute.js");
// Mount routes
app.use("/v1/auth", authRoutes);
app.use("/v1/category", categoryRoutes);
app.use("/v1/subcategory", subCategoryRoutes);
app.use("/v1/review", reviewRoutes);
app.use("/v1/banner", bannerRoutes);
app.use("/v1/blog", blogRoutes);
app.use("/v1/blog-category", blogCategoryRoutes);
app.use("/v1/tag", tagRoutes);
app.use("/v1/coupon", couponRoutes);
app.use("/v1/cart", cartRoutes);
app.use("/v1/product", productRoutes);
app.use("/v1/super-admin", superAdminRoutes);
app.use("/v1/order", orderRoutes);
app.use("/v1/shipping-address", shippingAddressRoute);
app.use("/v1/payment", paymentRoutes);
app.use("/v1/wishlist", wishlistRoutes);
app.use("/v1/newsletter",newsletterRoutes );
app.use("/v1", uploadRoutes );
app.use("/v1/site-setting", siteSettingRoute);
app.use("/v1/testimonial", testimonialRoute);
app.use((err, req, res, next) => {
  // console.error(err.stack); 

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
  });
});

module.exports = app;