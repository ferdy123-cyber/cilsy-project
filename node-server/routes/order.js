const { Router } = require("express");

const {
  addOrder,
  getByTransactionId,
  deleteByid,
} = require("../controllers/orders");

const { Authorization } = require("../middleware/authorization");

const router = Router();

router.post("/", Authorization, addOrder);
router.get("/:id", Authorization, getByTransactionId);
router.delete("/:id", Authorization, deleteByid);

module.exports = router;
