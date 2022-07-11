require("dotenv").config();
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
var fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

var baseUrl = process.env.BASE_URL;

function allKategori(req, res) {
    let sql = "SELECT * FROM tbl_kategori;";
    conn.query(sql, function (err, result, fields) {
      if (err) throw err;
      let dr = { kategori : result };
      res.json(dr);
    });
  }

module.exports = { allKategori };