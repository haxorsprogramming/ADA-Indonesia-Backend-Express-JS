const express = require("express");
const mysql = require('mysql');
const app = express();
const port = 7001;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:false}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbs_ada_indonesia'
  });

app.get("/", (req, res) => {
    res.send("ADA Indonesia Backend");
});

app.get("/post/data/all", (req, res) => {

    let dataPost;
    let sql = "SELECT * FROM tbl_post;";
    conn.query(sql, function (err, result, fields) {
        if (err) throw err;
        dataPost = result;
        var data = {
            post : dataPost
        };
        res.json(data);
    });
    
});

app.get("/post/:slug/detail", (req, res) => {
    let slug = req.params.slug;
    let sql = `SELECT * FROM tbl_post WHERE slug='${slug}' LIMIT 0, 1`;
    conn.query(sql, function(err, result, fields){
        if (err) throw err;
        dataPost = result;
        var dr = {dataPost : dataPost}
        res.json(dr);
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
