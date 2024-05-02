// "use strict";
//! Burada bir function oluştrduk. Artık user contollerda ,order contollerda (uye olunca sipariş olusturunca )kullanıcıya MAİL gönderebiliriz. AMA o sayfada da REqUiRE ETMELİYİZ.

// const nodemailer = require("nodemailer");

// module.exports = function (to, subject, message) {
//   //Connect to MailServer ,mail serverena bağlı bir obje
//   // const transporter = nodemailer.createTransport({
//   //   //SMPT :mail göndericem
//   //   host: "smtp.ethereal.email",
//   //   port: 587,
//   //   secure: false, //ssl,tls
//   //   auth: {
//   //     user: "akdpcfcxicxp52ka@ethereal.email",
//   //     pass: "DuREmR3W4ht28TcFHe",
//   //   },
//   // });

//   //mail göndericekse sendMail metodunu kullanıyorum.
//   // transporter.sendMail(
//   //   {
//   //     from: "akdpcfcxicxp52ka@ethereal.email", //kimden
//   //     to: "smyyeoztrk43@gmail.com", // kime //aa@a.com, aaa@a.com
//   //     subject: "Hello",
//   //     text: "Hello from ben ...",
//   //     html: "Hello from ben <p>How are you</p>",
//   //   },
//   //   (error, success) => {
//   //     success ? console.log("SUCCESSS" + success) : console.log("ERROR", error);
//   //   }
//   // );

//   /* ------------------------------------------------------- */

//   //*Google mail
//   // //* Google -> AccountHome -> Security -> Two-Step-Verify -> App-Passwords
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "smyyeoztrk43@gmail.com",
//       pass: "tjwb ctdy jydp dflz",
//     },
//   });

//   //?YandexMail
//   // const transporter = nodemailer.createTransport({
//   //     service: 'Yandex',
//   //     auth: {
//   //         user: 'username@yandex.com',
//   //         pass: 'password' // your emailPassword
//   //     }
//   // })

//   transporter.sendMail(
//     {
//       from: "smyyeoztrk43@gmail.com",
//       to: "omercoskun4343@gmail.com",
//       subject: "hello",
//       text: "selam ",
//       html: "<h1>Aşkım naberr</h1>",
//     },
//     (error, success) => {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log(success);
//       }
//     }
//   );
// };

"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// sendMail(to, subject, message):

const nodemailer = require("nodemailer");

module.exports = function (to, subject, message) {
  // Connect to MailServer:
  // const transporter = nodemailer.createTransport({
  //     // SMTP:
  //     host: 'smtp.ethereal.email',
  //     port: 587,
  //     secure: false, // ssl, tls
  //     auth: {
  //         user: 'sfystdx7sif4vdr3@ethereal.email',
  //         pass: '9NQJqyC9TYYrh5Yqpj'
  //     }
  // })
  // console.log(transporter)

  // SendMail:
  // transporter.sendMail({
  //     from: 'sfystdx7sif4vdr3@ethereal.email',
  //     to: 'smyyeoztrk43@gmail.com', // 'a@b.com, c@d.com'
  //     subject: 'Hello',
  //     text: 'Hello There. How are you?',
  //     html: '<b>Hello There.</b> <p>How are you?</p>',
  // }, (error, success) => {
  //     success ? console.log('SUCCESS', success) : console.log('ERROR', error)
  // })

  //! GMAİLE BAĞLANMA GoogleMail (gmail)
  //* Google -> AccountHome -> Security -> Two-Step-Verify -> App-Passwords
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "smyyeoztrk43@gmail.com",
      pass: "tjwb ctdy jydp dflz",
    },
  });

  // //? YandexMail (yandex):
  // const transporter = nodemailer.createTransport({
  //     service: 'Yandex',
  //     auth: {
  //         user: 'username@yandex.com',
  //         pass: 'password' // your emailPassword
  //     }
  // })

  //! MAİL GÖNDERME
  transporter.sendMail(
    {
      // from: 'smyyeoztrk43@gmail.com',
      to: to, // 'omercoskun4369@gmail.com', //!3 parametreyı yukarıdakı fonksıyondan alıp buraya gönderdi.
      subject: subject, //  'Hello',
      text: message, // 'Hello There. How are you?',
      html: message, // '<b>Hello There.</b> <p>How are you?</p>',
    },
    (error, success) => console.log(success, error)
  );
};
