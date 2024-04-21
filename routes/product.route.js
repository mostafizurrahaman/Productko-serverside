const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { verifyJWT } = require("../middlewares/verifyJWT.middleware");
const { authorization } = require("../middlewares/authorization.middleware");

router
   .route("/")
   .get(productController.getAllProduct)
   .post(verifyJWT, authorization("seller"), productController.createProduct);

router
   .route("/:id")
   .get(productController.getSingleProductById)
   .patch(
      verifyJWT,
      authorization("seller", "buyer"),
      productController.updateProductById
   )
   .delete(
      verifyJWT,
      authorization("admin", "seller"),
      productController.deleteProductById
   );

module.exports = router;
