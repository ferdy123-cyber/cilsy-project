const { Router } = require("express");

const { addImage, deleteImage } = require("../controllers/image");

const { Authorization } = require("../middleware/authorization");

const router = Router();

router.post("/upload", Authorization, addImage);
router.delete("/:id", Authorization, deleteImage);

module.exports = router;
