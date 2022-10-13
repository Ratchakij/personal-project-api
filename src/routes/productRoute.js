const express = require("express");

const productController = require("../controllers/productController");
const upload = require("../middlewares/upload");

const router = express.Router(); // สร้าง router object

router.post(
  "/",
  upload.single("productImage"),
  productController.createProduct
);
router.get("/", productController.getAllProduct);
router.patch(
  "/:id",
  upload.single("productImage"),
  productController.updateProduct
);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
