const fs = require("fs");
const AppError = require("../utils/appError");
const cloudinary = require("../utils/cloudinary");

const { Product } = require("../models");

exports.createProduct = async (req, res, next) => {
  try {
    const { name } = req.body;
    const price = +req.body.price;
    const quantity = +req.body.quantity;
    const file = req.file;
    const data = {};

    let productImage;
    if (file) {
      const secureUrl = await cloudinary.upload(
        file.path,
        productImage ? cloudinary.getPublicId(productImage) : null
      );

      productImage = secureUrl;
      data.productImage = productImage;

      fs.unlinkSync(file.path);
    }

    if (name) {
      data.name = name;
    }
    if (price) {
      data.price = price;
    }
    if (quantity) {
      data.quantity = quantity;
    }
    if (productImage) {
      data.productImage = productImage;
    }

    const product = await Product.create(data);

    res.status(201).json({ product });
  } catch (err) {
    next(err);
  }
};

exports.getAllProduct = async (req, res, next) => {
  try {
    const product = await Product.findAll();
    res.status(201).json({ product });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
