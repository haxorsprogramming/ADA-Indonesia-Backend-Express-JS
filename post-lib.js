const mysql = require("mysql");
require("dotenv").config();

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

function allPost(req, res) {
  let sql = "SELECT * FROM tbl_post;";
  conn.query(sql, function (err, result, fields) {
    if (err) throw err;
    let dr = { post: result };
    res.json(dr);
  });
}

function detailPost(req, res, slug) {
  let sql = `SELECT * FROM tbl_post WHERE slug='${slug}' LIMIT 0, 1`;
  conn.query(sql, function (err, result, fields) {
    if (err) throw err;
    dataPost = result;
    var dr = { dataPost: dataPost };
    res.json(dr);
  });
}

function addPostingan() {
  console.log("Postingan telah di add");
}

module.exports = { addPostingan, allPost, detailPost };
