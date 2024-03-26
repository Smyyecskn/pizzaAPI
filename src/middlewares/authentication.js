"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
//
const Token = require("../models/token");

module.exports = async (req, res, next) => {
  const auth = req.headers?.authorization; // Token ...Tokenkey
  const tokenKey = auth ? auth.split(" ") : null; //["Token" ""...Tokenkey"]

  if (tokenKey) {
    if (tokenKey[0] == "Token") {
      const tokenData = await Token.findOne({ token: tokenKey[1] }).populate(
        "userId"
      ); //burdaki userId'yi populate yaptıgımdan
      // console.log(tokenData)
      req.user = tokenData ? tokenData.userId : false; //buradan tokenData.userId demek bu ıdye baglı olan butun değerler gelecek.
    }
  }
  next();
};
