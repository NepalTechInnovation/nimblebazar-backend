const Messages = {
  AUTH: {
    LOGIN_SUCCESS: "Login Successful",
    LOGIN_FAILED: "Invalid credentials",
    UNAUTHORIZED: "Unauthorized access",
    PROFILE_UPDATED: "Profile Updated",
    REGISTER_SUCCESS: "Register Successful",
    FETCH_PROFILE: "Fetch Successful",
  },
  USER: {
    UPDATE_SUCCESS: "Profile Updated Successfully",
    NOT_FOUND: "User not found",
    UPDATE_FAILED: "Failed to update user",
  },
  PRODUCT: {
    CREATE_SUCCESS: "Product created successfully",
    UPDATE_SUCCESS: "Product updated successfully",
    PRODUCT_FETCH_SUCCESS: "Product fetch successfully",
    NOT_FOUND: "Product not found",
    FAILED_PRODUCT_UPDATE: "Failed to update product",
    FETCH_PRODUCT_FAILED: 'Failed to fetch products',
    DELETE_SUCCESS: "Product deleted successfully"
  },
  CATEGORY: {
    CREATE_SUCCESS: "Category created successfully",
    UPDATE_SUCCESS: "Category updated successfully",
    DELETE_SUCCESS: "Category deleted successfully",
    FETCH_SUCCESS: "Category fetch successfully",
    NOT_FOUND: "Category not found",
    EXIST: "Category alredy exist"
  },
  SUB_CATEGORY: {
    CREATE_SUCCESS: " Subcategory created successfully",
    UPDATE_SUCCESS: "Subcategory updated successfully",
    PRODUCT_FETCH_SUCCESS: "Subcategory fetch successfully",
    NOT_FOUND: "Subcategory not found",
    EXIST: "Subcategory alredy exist"
  },
  CART: {
    CREATE_SUCCESS: "cart created successfully",
    UPDATE_SUCCESS: "cart updated successfully",
    FETCH_SUCCESS: "cart fetch successfully",
    NOT_FOUND: "cart not found",
    EXIST: "cart alredy exist",
    REMOVED: "item removed",
    CLEARED: 'item cleaned'
  },
  LOCATION: {
    CREATE_SUCCESS: "location created successfully",
    UPDATE_SUCCESS: "location updated successfully",
    FETCH_SUCCESS: "location fetch successfully",
    NOT_FOUND: "location not found",
    EXIST: "location alredy exist",
    REMOVED: "location removed",
    CLEARED: 'location cleaned',
  },
  BLOG: {
    CREATE_SUCCESS: "blog created successfully",
    UPDATE_SUCCESS: "blog updated successfully",
    FETCH_SUCCESS: "blog fetch successfully",
    NOT_FOUND: "blog not found",
    EXIST: "blog alredy exist",
    REMOVED: "blog removed",
    CLEARED: 'blog cleaned',
    ERROR: "blog to find"
  },
  BLOG_CATEGORY: {
    CREATE_SUCCESS: "blog category created successfully",
    UPDATE_SUCCESS: "blog category updated successfully",
    DELETE_SUCCESS: "blog category deleted successfully",
    PRODUCT_FETCH_SUCCESS: "blog category fetch successfully",
    NOT_FOUND: "blog category not found",
    EXIST: "blog category alredy exist"
  },
  ORDER: {
    CREATE_SUCCESS: "order created successfully",
    UPDATE_SUCCESS: "order updated successfully",
    FETCH_SUCCESS: "order fetch successfully",
    NOT_FOUND: "order not found",
    FAILED_UPDATE: "order to update product",
    FETCH_FAILED: 'order to fetch products',
    DELETE_SUCCESS: "order deleted successfully"
  },
  SHIPPING_ADDRESS: {
    CREATE_SUCCESS: "shipping address created successfully",
    UPDATE_SUCCESS: "shipping address updated successfully",
    FETCH_SUCCESS: "shipping address fetch successfully",
    NOT_FOUND: "shipping address not found",
    FAILED_UPDATE: "shipping address to update product",
    FETCH_FAILED: 'shipping address to fetch products',
    DELETE_SUCCESS: "shipping address deleted successfully"
  },
  DASHBOARD: {
    FETCH_SUCCESS: "dashboard fetch successfully",
    NOT_FOUND: "dashboard not found",
    FAILED_UPDATE: "dashboardto update product",
    FETCH_FAILED: 'sdashboard to fetch products',
  },
  PAYMENT: {
    CREATE_SUCCESS: "payment created successfully",
    UPDATE_SUCCESS: "payment updated successfully",
    FETCH_SUCCESS: "payment fetch successfully",
    NOT_FOUND: "payment not found",
    EXIST: "payment alredy exist",
    REMOVED: "payment removed",
    CLEARED: 'payment cleaned'
  },
  CUSTOMER: {
    CREATE_SUCCESS: "customer created successfully",
    DELETE_SUCCESS: "customer deleted successfully",
    REQUIRED: "customer required",
    NOT_FOUND: "customer not found",
    FETCH_SUCCESS: "customer fetch successfully",
    INACTIVE: "customer already inactive",
    NOT_CUSTOMER: "User is not customer",
    UPDATE_SUCCESS: "customer updated successfully",
  },
  COUPON: {
    CREATE_SUCCESS: "coupon created successfully",
    UPDATE_SUCCESS: "coupon updated successfully",
    FETCH_SUCCESS: "coupon fetch successfully",
    NOT_FOUND: "coupon not found",
    EXIST: "coupon alredy exist",
    REMOVED: "coupon removed",
    CLEARED: 'coupon cleaned'
  },
  BANNER: {
    CREATE_SUCCESS: "banner created successfully",
    UPDATE_SUCCESS: "banner updated successfully",
    FETCH_SUCCESS: "banner fetch successfully",
    NOT_FOUND: "banner not found",
    EXIST: "banner alredy exist",
    REMOVED: "banner removed",
    CLEARED: 'banner cleaned',
    ERROR: "banner to find"
  },
  OTP: {
    EMAIL_ERROR: "Email is required",
    SUCCESS: "A reset link has been sent to your email.",
    FAILED:"Failed to send OTP",
    INVALID_OR_EXPRIED:"Invalid or expired OTP",
    VERIFIED:"Email verified successfully"
  },
   PASSWORD: {
    SUCCESS: "Password changed successfully",
 
  },
  REVIEW: {
    CREATE_SUCCESS: "review created successfully",
    UPDATE_SUCCESS: "review updated successfully",
    FETCH_SUCCESS: "review fetch successfully",
    NOT_FOUND: "review not found",
    EXIST: "review alredy exist",
    REMOVED: "review removed",
    CLEARED: 'review cleaned',
    ERROR: "unable to find review"
  },
   WISHLIST: {
    CREATE_SUCCESS: "Wishlist created successfully",
    UPDATE_SUCCESS: "Wishlist updated successfully",
    DELETE_SUCCESS: "Wishlist deleted successfully",
    FETCH_SUCCESS: "Wishlist fetch successfully",
    NOT_FOUND: "Wishlist not found",
    EXIST: "Wishlist alredy exist"
  },
  SUBSCRIBE: {
    CREATE_SUCCESS: "subscribe created successfully",
    UPDATE_SUCCESS: "subscribe updated successfully",
    FETCH_SUCCESS: "subscribe fetch successfully",
    NOT_FOUND: "subscribe not found",
    EXIST: "subscribe alredy exist",
    REMOVED: "subscribe removed",
    CLEARED: 'subscribe cleaned',
    ERROR: "unable to find subscribe"
  },
   SITE_SETTING: {
        CREATE_SUCCESS: "setting created successfully",
        UPDATE_SUCCESS: "setting updated successfully",
        DELETE_SUCCESS: "setting deleted successfully",
        FETCH_SUCCESS: "setting fetch successfully",
        ERROR: "unable to find setting"
    },
       TESTIMONIAL: {
        CREATE_SUCCESS: "testimonial created successfully",
        UPDATE_SUCCESS: "testimonial updated successfully",
        DELETE_SUCCESS: "testimonial deleted successfully",
        FETCH_SUCCESS: "testimonial fetch successfully",
        ERROR: "unable to find testimonial"
    },
  GENERAL: {
    SOMETHING_WENT_WRONG: "Something went wrong",
  }
};

module.exports = Messages;
