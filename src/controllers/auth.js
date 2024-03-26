"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
//! Token modeli ve User modeli require ederek Bir TOKEN OLUŞTURDU. Sadece token vermek bu işlem için yeterli değil bunu kontrol etmemiz gerek. AUTHENTİCATİON MİDDLEWARE YAZICAZ.SİSTEMİN TÜMÜNÜ İNGİLENDİRMELİ ÇÜNKÜ(2.31)
// Auth Controller:
const User = require("../models/user");
const Token = require("../models/token");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  login: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.description = 'Login with username (or email) and password for get simpleToken and JWT'
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    "username": "test",
                    "password": "aA?123456",
                }
            }
        */

    const { username, email, password } = req.body;

    if ((username || email) && password) {
      const user = await User.findOne({ $or: [{ username }, { email }] });

      if (user && user.password == passwordEncrypt(password)) {
        //Usermodeldeki password veritabanındaki şifrelenmiş hali ile ==? kullanıcının gonderdıgı (pasword)u eşitleyıp bakmamız gerek.
        if (user.isActive) {
          /* SIMPLE TOKEN */

          let tokenData = await Token.findOne({ userId: user.id });

          if (!tokenData)
            tokenData = await Token.create({
              userId: user.id,
              token: passwordEncrypt(user.id + Date.now()),
            });

          /* SIMPLE TOKEN */

          res.status(200).send({
            error: false,
            token: tokenData.token,
            user,
          });
        } else {
          res.errorStatusCode = 401;
          throw new Error("This account is not active.");
        }
      } else {
        res.errorStatusCode = 401;
        throw new Error("Wrong username/email or password.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please enter username/email and password.");
    }
  },

  logout: async (req, res) => {
    const auth = req.headers?.authorization; // Token ...Tokenkey
    const tokenKey = auth ? auth.split(" ") : null; //["Token" ""...Tokenkey"]
    const result = await Token.findOne({ token: tokenKey[1] });
    res.status(200).send({
      error: false,
      message: "Token DELETED. Logout was OK.",
      result,
    });
  },
};
