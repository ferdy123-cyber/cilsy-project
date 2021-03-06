const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;
const { sequelize } = require("./database/models");

const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const sizeRouter = require("./routes/size");
const imgRouter = require("./routes/image");
const orderRouter = require("./routes/order");
const transactionRouter = require("./routes/transaction");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));

sequelize.authenticate().then(() => {
  console.log("success connect database");
});

app.use("/auth", userRouter);
app.use("/product", productRouter);
app.use("/size", sizeRouter);
app.use("/image", imgRouter);
app.use("/order", orderRouter);
app.use("/transaction", transactionRouter);

app.use((error, req, res, next) => {
  return res.status(400).send({
    status: "error",
    code: 400,
    message: "Bad Request",
    error: error.message,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
