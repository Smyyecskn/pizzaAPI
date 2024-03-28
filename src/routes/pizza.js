"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
const pizza = require("../controllers/pizza");
const { isLogin, isAdmin } = require("../middlewares/permissions");

//URL:/pizzas
router.route("/").get(isLogin, pizza.list).post(isLogin, pizza.create);
router
  .route("/:id")
  .get(isLogin, pizza.read)
  .put(isAdmin, pizza.update)
  .patch(isAdmin, pizza.update)
  .delete(isAdmin, pizza.delete);
/* ------------------------------------------------------- */
module.exports = router;
