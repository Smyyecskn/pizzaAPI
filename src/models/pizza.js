"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */

const PizzaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true, //aynı pizza isminden bir tane daha olmasın.
    },
    images: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    toppingIds: [
      {
        //Farklı pizzalarda farklı malzeme(topping) OLMALI.
        //pizza tablosundaki birden fazla veri topping tablosundaki birden fazla veriyle eşleşebilir.many to many
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topping", //
      },
    ],
  },
  { collection: "pizzas", timestamps: true }
);

module.exports = mongoose.model("Pizza", PizzaSchema);
