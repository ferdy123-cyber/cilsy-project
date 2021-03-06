const { transaction } = require("../database/connection");
const { Transaction, Order } = require("../database/models");

const addTransaction = async (req, res, next) => {
  try {
    const { user } = req;

    const status = "pending";

    const total_payment = 0;

    const newTransaction = await Transaction.create({
      status,
      user_id: user.id,
      total_payment,
    });

    return res.status(201).json({
      status: "success",
      code: 201,
      data: newTransaction,
    });
  } catch (error) {
    return next(error);
  }
};

const findById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findByPk(id, {
      include: [
        {
          model: Order,
          as: "orders",
        },
      ],
    });

    return res.status(201).json({
      status: "success",
      code: 201,
      data: transaction,
    });
  } catch (error) {
    return next(error);
  }
};

const getAllByUser = async (req, res, next) => {
  try {
    const { user } = req;

    const transactions = await Transaction.findAll({
      include: [
        {
          model: Order,
          as: "orders",
        },
      ],

      where: {
        user_id: user.id,
      },
    });
    return res.status(201).json({
      status: "success",
      code: 201,
      data: transactions,
    });
  } catch (error) {
    return next(error);
  }
};

const deleTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Transaction.destroy({
      where: {
        id,
      },
    });

    await Order.destroy({
      where: {
        transaction_id: id,
      },
    });

    return res.status(201).json({
      status: "success",
      code: 201,
    });
  } catch (error) {
    return next(error);
  }
};

const editTransaction = async (req, res, next) => {
  try {
    const { id } = req.body;

    await Transaction.update(
      {
        status: "paid",
      },
      {
        where: {
          id,
        },
      }
    );
    const updatetrsc = await Transaction.findOne({
      where: {
        id,
      },
    });
    return res.status(201).json({
      status: "success",
      code: 201,
      data: updatetrsc,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  addTransaction,
  findById,
  getAllByUser,
  deleTransaction,
  editTransaction,
};
