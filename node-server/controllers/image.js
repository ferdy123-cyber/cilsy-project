const { Image } = require("../database/models");
const cloudinary = require("../database/cloudinary");
const multer = require("multer");

const addImage = async (req, res, next) => {
  try {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "uploads/");
      },
      filename: function (req, file, cb) {
        console.log(file);
        cb(null, new Date().getTime() + "-" + file.originalname);
      },
    });

    const upload = multer({ storage }).single("image");
    upload(req, res, function (err) {
      if (err) {
        return res.send(err);
      }
      const { product_id } = req.body;
      const path = req.file.path;
      cloudinary.uploader.upload(path, function (err, image) {
        if (err) return res.send(err);
        console.log("file uploaded to Cloudinary");
        // remove file from server
        const fs = require("fs");
        fs.unlinkSync(path);
        // return image details

        Image.create({
          product_id,
          url: image.url,
        });

        return res.status(201).json({
          message: "succes",
          url: image.url,
        });
      });
    });

    // const files = req.body.data;
    // const uploadRes = await cloudinary.uploader.upload(files, {});
    // const { user } = req;
    // const { product_id } = req.body;
    // if (user.role === "admin") {
    //   const productImage = await Image.create({
    //     product_id,
    //     url: uploadRes.url,
    //   });
    //   return res.status(201).json({
    //     status: "success",
    //     code: 201,
    //     message: "success create product image",
    //     data: productImage,
    //   });
    // } else {
    //   return res.status(401).json({
    //     status: "error",
    //     code: 401,
    //     message: "cannot edit the product except admin",
    //   });
    // }
  } catch (error) {
    return next(error);
  }
};

const deleteImage = async (req, res, next) => {
  const { user } = req;
  const { id } = req.params;

  try {
    if (user.role === "admin") {
      await Image.destroy({
        where: {
          id,
        },
      });

      return res.status(201).json({
        status: "success",
        code: 201,
        message: "Success delete image",
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

module.exports = {
  addImage,
  deleteImage,
};
