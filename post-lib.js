require("dotenv").config();
const mysql = require("mysql");
const jwt = require('jsonwebtoken');

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
    try{
        var dataJwt = jwt.verify(token, process.env.TOKEN_SECRET);
        
        let judul = req.body.judul;
        let slug = req.body.slug;
        let shortDeks = req.body.short_deks;
        let longDeks = req.body.long_deks;
        let coverHomepage = req.body.cover_homepage;
        let img = req.body.img_feature;
        let writer = req.body.writer;
        var sql = `INSERT INTO tbl_post (judul, slug, short_deks, long_deks, cover_homepage, img_feature, writer) VALUES('${judul}', '${slug}','${shortDeks}','${longDeks}','${coverHomepage}','${img}','${writer}');`;
        conn.query(sql, function (err, result) {
            if (err) throw err;
            let dr = {status : "Data sukses di insert ..."}
            res.json(dr);
        });
    }catch(err){
        res.sendStatus(401);
    }
}

module.exports = { addPostingan, allPost, detailPost };
