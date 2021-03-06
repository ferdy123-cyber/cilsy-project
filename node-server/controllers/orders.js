const { Order, Product, Transaction } = require("../database/models");

const addOrder = async (req, res, next) => {
  try {
    const { user } = req;
    const { product_id, product_qty } = req.body;

    const status = "pending";
    const total_payment = 0;
    const newTransaction = await Transaction.create({
      status,
      user_id: user.id,
      total_payment,
    });

    const product = await Product.findOne({
      where: {
        id: product_id,
      },
    });

    const newOrder = await Order.create({
      product_id,
      product_qty,
      product_price: product.price * product_qty,
      product_discount: product.discount * product_qty,
      transaction_id: newTransaction.id,
      user_id: user.id,
    });

    await Transaction.update(
      {
        total_payment: newOrder.product_discount,
      },
      {
        where: {
          id: newOrder.transaction_id,
        },
      }
    );

    const transaction = await Transaction.findOne({
      where: {
        id: newOrder.transaction_id,
      },
    });

    const sisaStock = product.stock - newOrder.product_qty;

    if (sisaStock < 0) {
      throw new Error("Stock empty");
    }

    if (newOrder.product_qty > product.stock) {
      throw new Error("over product quantity from stock");
    }

    await Product.update(
      {
        stock: sisaStock,
      },
      {
        where: {
          id: product_id,
        },
      }
    );

    return res.status(201).json({
      status: "success",
      code: 201,
      data: newOrder,
      transaction: transaction,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

const getByTransactionId = async (req, res, next) => {
  try {
    const { user } = req;
    const { id } = req.params;

    const order = await Order.findAll({
      where: {
        transaction_id: id,
      },
    });

    if (!order) {
      throw new Error("Your order not found");
    }

    return res.status(201).json({
      status: "success",
      code: 201,
      data: order,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteByid = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.destroy({
      where: {
        id,
      },
    });

    return res.status(201).json({
      status: "success",
      code: 201,
      data: deletedOrder,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  addOrder,
  getByTransactionId,
  deleteByid,
};
