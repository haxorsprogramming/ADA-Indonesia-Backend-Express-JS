require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const postLib = require("./post-lib.js");
const authLib = require("./auth-lib.js");
const kategoriLib = require("./kategori-lib.js");

var fs = require('fs');
const { v4: uuidv4 } = require('uuid');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", (req, res) => {
    res.send("<code>ADA Indonesia Backend</code>");
});

app.post("/auth/token/create", (req, res) => {
    authLib.createToken(req, res);
});

app.post("/auth/user/login", (req, res) => {
    authLib.loginUserProses(req, res);
});

app.get("/post/data/all", (req, res) => {
    postLib.allPost(req, res);
});

app.get("/post/:slug/detail", (req, res) => {
    postLib.detailPost(req, res);
});

app.post("/post/data/add", (req, res) => {
    postLib.addPostingan(req, res);
});

app.post("/post/delete/process", (req, res) => {
    postLib.deletePostingan(req, res);
});

app.get("/kategori/data/all", (req, res) => {
    kategoriLib.allKategori(req, res);
});

app.get("/post/popular/first", (req, res) => {
    postLib.popularPost(req, res);
});

app.get("/post/recent", (req, res) => {
    postLib.recentPost(req, res);
});

app.get("/kategori/:kategori", (req, res) => {
    postLib.getByKategori(req, res);
});

app.listen(port, () => {
    console.log(`Aplikasi berjalan di port ${port}`);
});
