require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const postLib = require("./post-lib.js");
const authLib = require("./auth-lib.js");
var fs = require('fs');
const { v4: uuidv4 } = require('uuid');

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
    authLib.createToken(req, res, username);
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

app.post("/test/base64", (req, res) => {
    let fileImg = req.body.img;
    let base64Image = fileImg.split(';base64,').pop();
    let kdFile = uuidv4();
    let filePath = `file/${kdFile}.png`; 
    fs.writeFile(filePath, base64Image, {encoding: 'base64'}, function(err) {
        res.sendStatus(200);
    });
    
});

app.listen(port, () => {
    console.log(`Aplikasi berjalan di port ${port}`);
});
