const fs = require("fs");
const AppError = require("../utils/appError");

const { Product } = require("../models");

exports.createProduct = async (req, res, next) => {
  try {
    const { name, productImage } = req.body;
    const price = +req.body.price;
    const quantity = +req.body.quantity;
    const data = {};

    // console.log(req.body);

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
    next();
  }
};
