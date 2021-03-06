const { model } = require("../database/connection");
const { Product, Size, Image } = require("../database/models");

const addProduct = async (req, res, next) => {
  try {
    const { user } = req;
    const { name, description, stock, price, discount, sex, color } = req.body;

    if (user.role === "admin") {
      const product = await Product.create({
        name,
        description,
        stock,
        price,
        discount,
        sex,
        color,
        user_id: user.id,
      });

      return res.status(201).json({
        status: "succes",
        code: 201,
        message: "success add new product",
        data: product,
      });
    } else {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "cannot edit the product except admin",
      });
    }
  } catch (error) {
    return next(error);
  }
};

const allProduct = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Size,
          as: "sizes",
        },
        {
          model: Image,
          as: "images",
        },
      ],
    });

    return res.status(201).json({
      status: "success",
      code: 201,
      message: "succes get product",
      data: products,
    });
  } catch (error) {
    return next(error);
  }
};

const findById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id, {
      include: [
        {
          model: Size,
          as: "sizes",
        },
        {
          model: Image,
          as: "images",
        },
      ],
    });

    if (!product) {
      throw new Error("Product not found");
    }

    return res.status(201).json({
      status: "success",
      code: 201,
      data: product,
    });
  } catch (error) {
    return next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { user } = req;
    const {
      id,
      name,
      description,
      stock,
      price,
      discount,
      sex,
      color,
    } = req.body;

    if (user.role === "admin") {
      const product = await Product.findByPk(id);

      if (!product) {
        throw new Error("Product not found");
      }

      await Product.update(
        {
          name,
          description,
          stock,
          price,
          discount,
          sex,
          color,
          user_id: user.id,
        },
        {
          where: {
            id,
          },
        }
      );

      const updatedProduct = await Product.findByPk(id);

      return res.status(201).json({
        status: "success",
        code: 201,
        data: updatedProduct,
      });
    } else {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "cannot edit the product except admin",
      });
    }
  } catch (error) {
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { user } = req;
    const { id } = req.params;

    if (user.role === "admin") {
      await Product.destroy({
        where: {
          id,
        },
      });

      await Size.destroy({
        where: {
          product_id: id,
        },
      });

      await Image.destroy({
        where: {
          product_id: id,
        },
      });

      return res.status(201).json({
        status: "success",
        code: 201,
        message: "Success delete product",
      });
    } else {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "cannot edit the product except admin",
      });
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  addProduct,
  allProduct,
  findById,
  updateProduct,
  deleteProduct,
};
