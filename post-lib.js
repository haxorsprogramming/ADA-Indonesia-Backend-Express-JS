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

function allPost(req, res) {
  let sql = "SELECT * FROM tbl_post;";
  conn.query(sql, function (err, result, fields) {
    if (err) throw err;
    let dr = { post: result };
    res.json(dr);
  });
}

function detailPost(req, res) {
  let slug = req.params.slug;
  let sql = `SELECT * FROM tbl_post WHERE slug='${slug}' LIMIT 0, 1`;
  conn.query(sql, function (err, result, fields) {
    if (err) throw err;
    dataPost = result;
    var dr = { dataPost: dataPost };
    res.json(dr);
  });
}

function addPostingan(req, res) {
  let token = req.body.ada_token;
  if (token == null) return res.sendStatus(401);
  try {
    let judul = req.body.judul;
    let slug = req.body.slug;
    let shortDeks = req.body.short_deks;
    let longDeks = req.body.long_deks;
    let coverHomepage = req.body.cover_homepage;
    let kategori = req.body.kategori;
    // let img = req.body.img_feature;
    let writer = req.body.writer;
    let fileImg = req.body.img;
    let base64Image = fileImg.split(";base64,").pop();
    let kdFile = uuidv4();
    let filePath = `public/file/upload/img/${kdFile}.png`;
    fs.writeFile(filePath, base64Image, { encoding: "base64" }, function (err) {
      // res.sendStatus(200);
      let imgPath = baseUrl + `file/upload/img/${kdFile}.png`;
      var sql = `INSERT INTO tbl_post (judul, slug, short_deks, long_deks, cover_homepage, img_feature, writer, kategori) VALUES('${judul}', '${slug}','${shortDeks}','${longDeks}','${coverHomepage}','${imgPath}','${writer}', '${kategori}');`;
      conn.query(sql, function (err, result) {
        if (err) throw err;
        let dr = { status: "SUCCESS" };
        res.json(dr);
      });
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(401);
  }
}

function deletePostingan(req, res){
  let idPost = req.body.idPost;
  let sql = `DELETE FROM tbl_post WHERE id='${idPost}';`;
  conn.query(sql, function (err, result) {
    if (err) throw err;
    // console.log("Number of records deleted: " + result.affectedRows);
    let dr = { status: "SUCCESS" };
    res.json(dr);
  });
}

module.exports = { addPostingan, allPost, detailPost, deletePostingan };
