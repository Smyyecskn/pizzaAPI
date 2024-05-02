"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Auth Controller:

const User = require("../models/user");
const Token = require("../models/token");
const passwordEncrypt = require("../helpers/passwordEncrypt");
const jwt = require("jsonwebtoken");

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
        if (user.isActive) {
          /* SIMPLE TOKEN */

          let tokenData = await Token.findOne({ userId: user._id }); //token varsa
          //1-token yoksa şifreli bir token oluşturduk.Token veriyor olmak yeterli değil. 2-Sistemin tümünü ilgilendiren bir middleware yazdık.
          if (!tokenData)
            tokenData = await Token.create({
              userId: user.id,
              token: passwordEncrypt(user.id + Date.now()),
            });

          /* SIMPLE TOKEN */

          /* JWT */
          //2 token oluşturacam token datalarını hazırlıyoruz.
          const accessInfo = {
            // kısa omurlu krıtık data
            key: process.env.ACCESS_KEY,
            time: process.env.ACCESS_EXP || "30m",
            data: {
              _id: user.id,
              username: user.username,
              email: user.email,
              password: user.password,
              isActive: user.isActive,
              isAdmin: user.isAdmin,
            },
          };

          const refreshInfo = {
            //cok krıtık olmayan uzun omurlu olan datalar
            key: process.env.REFRESH_KEY,
            time: process.env.REFRESH_EXP || "3d",
            data: {
              id: user.id,
              password: user.password, // encrypted password
            },
          };

          // jwt.sign(access_data, access_key, { expiresIn: '30m' }) //ŞİFRELEME İŞLEMİ TOKEN OLUŞTURMA.
          const accessToken = jwt.sign(accessInfo.data, accessInfo.key, {
            expiresIn: accessInfo.time,
          });
          //REFRESH YANI UZUN SURELI TOKEN OLUŞTUR.
          const refreshToken = jwt.sign(refreshInfo.data, refreshInfo.key, {
            expiresIn: refreshInfo.time,
          });

          /* JWT */

          res.status(200).send({
            error: false,
            token: tokenData.token, //response olarak 3unu de donmus oluyorum token,access,refresh
            bearer: {
              access: accessToken,
              refresh: refreshToken,
            },
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

  refresh: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "JWT: Refresh"
            #swagger.description = 'Refresh token.'
        */

    const refreshToken = req.body?.bearer?.refresh;

    if (refreshToken) {
      const refreshData = await jwt.verify(
        refreshToken,
        process.env.REFRESH_KEY
      );
      // console.log(refreshData)

      if (refreshData) {
        const user = await User.findOne({ _id: refreshData.id });
        console.log(user, typeof user); //bak bakalım tıpıne

        if (user && user.password == refreshData.password) {
          res.status(200).send({
            error: false,
            bearer: {
              access: jwt.sign(user.toJSON(), process.env.ACCESS_KEY, {
                //mongoose bızden json objesı bekler o yuzden JSONLASTIRDIK.
                expiresIn: process.env.ACCESS_EXP,
              }),
            },
          });
        } else {
          res.errorStatusCode = 401;
          throw new Error("Wrong id or password.");
        }
      } else {
        res.errorStatusCode = 401;
        throw new Error("JWT refresh data is wrong.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please enter bearer.refresh");
    }
  },

  logout: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "simpleToken: Logout"
            #swagger.description = 'Delete token key.'
        */

    const auth = req.headers?.authorization; // Token ...tokenKey...
    const tokenKey = auth ? auth.split(" ") : null; // ['Token', '...tokenKey...']
    const result = await Token.deleteOne({ token: tokenKey[1] });
    //!(25/3 2.44)userın sılınıp sılınmedıgıne bakmak için thunderda /(anasayfaya) tokenımızla gidip POST atarsak bize user bilgisi verirse giriş yapılmış user bilgisi yoksa çıkış BAŞARILI. TOKEN DOGRUYSA sistemin heryerine ben USER DATASINI req.user ile GÖNDEREBİLDİM.(index 144).
    //! ÇIKIŞ YAPTIGIMDA ise artık bana tekrar auth/login yaparsam YENİ BİR TOKEN OLUŞTURUR.

    if (tokenKey[0] == "Token") {
      res.status(result.deletedCount > 0 ? 204 : 404).send({
        error: result.deletedCount,
        message: "Token deleted. Logout was OK.",
        result,
      });
    } else {
      res.send({
        error: false,
        message: "JWT: No need any process for logout.",
      });
    }
  },
};
