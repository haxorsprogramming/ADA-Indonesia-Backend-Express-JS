require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const postLib = require("./post-lib.js");
const lib = require("./lib.js");

app.use(bodyParser.urlencoded({extended:true}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/", (req, res) => {
    res.send("<code>ADA Indonesia Backend</code>");
});

app.get("/post/data/all", (req, res) => {
    postLib.allPost(req, res);
});

app.get("/post/:slug/detail", (req, res) => {
    let slug = req.params.slug;
    postLib.detailPost(req, res, slug);
});

app.post("/auth/token/create", (req, res) => {
    let username = req.body.username;
    lib.createToken(req, res, username);
});

app.post("/post/data/add", (req, res) => {
    let token = req.body.ada_token;
    if (token == null) return res.sendStatus(401);
    try{
        var dataJwt = jwt.verify(token, process.env.TOKEN_SECRET);
        postLib.addPostingan();
        let dr = {dataJwt : dataJwt}
        res.json(dr);
    }catch(err){
        res.sendStatus(401);
    }
});

app.listen(port, () => {
    console.log(`Aplikasi berjalan di port ${port}`);
});
