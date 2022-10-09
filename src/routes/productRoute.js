const express = require("express");

const productController = require("../controllers/productController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router(); // สร้าง router object

router.post("/", productController.createProduct);
router.get("/", productController.getAllProduct);

module.exports = router;
