const { Router } = require("express");
const { addSize, deleteSize } = require("../controllers/size");

const { Authorization } = require("../middleware/authorization");

const router = Router();

router.post("/", Authorization, addSize);
router.delete("/:id", Authorization, deleteSize);

module.exports = router;
