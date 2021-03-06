const { Router } = require("express");
const {
  addTransaction,
  findById,
  getAllByUser,
  deleTransaction,
  editTransaction,
} = require("../controllers/transaction");

const { Authorization } = require("../middleware/authorization");

const router = Router();

router.post("/", Authorization, addTransaction);
router.get("/:id", Authorization, findById);
router.get("/", Authorization, getAllByUser);
router.delete("/:id", Authorization, deleTransaction);
router.patch("/", Authorization, editTransaction);

module.exports = router;
