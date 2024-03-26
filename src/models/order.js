"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, //unique değil çünkü bir kullanıcı birden fazla sipariş verebilir.Unique olursa bir kullanıcı sadece 1 sipariş verebilir.
    },
    pizzaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pizza", //unique değil çünkü bir pizza birden fazla kullanıcının siparişinde yer alabilir.1 Pizzadan bir kişi sipariş verebilir.
      required: true,
    },
    size: {
      type: String,
      trim: true,
      required: true,
      enum: ["Small", "Medium", "Large", "XLarge"], //bu 4 veriden başka bir buyukluk kullanamam.Burda yazan gibi yazmalısın.
    },
    quantity: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
    },
    amount: {
      type: Number,
      default: function () {
        return this.quantity * this.price;
      }, //sadece CREATE'de çalışır.
      transform: function () {
        return this.quantity * this.price;
      }, // UPDATE'de de çalışsın istersem ki istemeliyim bunu KULLAN.
    },
  },
  { collection: "orders", timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
