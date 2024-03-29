"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
const pizza = require("../controllers/pizza");
const { isAdmin } = require("../middlewares/permissions");
/* ------------------------------------------------------- */
//*UPLOAD
//multer modulu ile "form-data" verileri kabul edebiliiriz.Yani dosya yükleme yapabiliriz.

// const multer = require("multer");

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: "./uploads",
//     filename: function (req, file, returnCallback) {
//       // returnCallback(error,fileName)
//       returnCallback(null, file.originalname);
//     },
//   }),
// });

const upload = require("../middlewares/upload");
//dosya bana array ve any istersem req.files içinde single istersem req.file olarak gelir.
/* ------------------------------------------------------- */
//URL:/pizzas
router
  .route("/")
  .get(pizza.list)
  // router.route("/").get(pizza.list).post(isAdmin,upload.single("fieldName"), pizza.create) 1.yol
  .post(isAdmin, upload.array("images"), pizza.create); //tavsiye edilen 2.yol
// router.route("/").get(pizza.list).post(isAdmin,upload.any(), pizza.create); 3.yol

router
  .route("/:id")
  .get(pizza.read)
  .put(isAdmin, upload.array("images"), pizza.update)
  .patch(isAdmin, upload.array("images"), pizza.update)
  .delete(isAdmin, pizza.delete);
/* ------------------------------------------------------- */
module.exports = router;
