require("dotenv").config();
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

function createToken(req, res) {
  let username = req.body.username;
  var token = jwt.sign({ username: username }, process.env.TOKEN_SECRET);
  let dr = { token: token };
  res.json(dr);
}

function loginUserProses(req, res) {
  console.log("Start login proses ...");
  
  let username = req.body.username;
  let password = req.body.password;

  // cek username
  let sql = `SELECT * FROM tbl_user WHERE username='${username}';`;
  conn.query(sql, function (err, result, fields) {
    if (err) throw err;
    let tr = result.length;
    if (tr !== 0) {
      let dataUser = result[0];
      let passwordDb = dataUser["password"];
      bcrypt.compare(password, passwordDb, function (err, isMatch) {
        if (err) {
          throw err;
        } else if (!isMatch) {
          let dr = { status : 'wrong_password' };
          res.json(dr);
        } else {
          var token = jwt.sign({ username: username }, process.env.TOKEN_SECRET);
          let dr = { status : 'success' , 'token' : token };
          res.json(dr);
        }
      });
    } else {
      let dr = { status: "no_user" };
      res.json(dr);
    }
  });
}

module.exports = { createToken, loginUserProses };
