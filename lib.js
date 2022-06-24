const mysql = require("mysql");
require('dotenv').config();
const jwt = require('jsonwebtoken');

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


function createToken(req, res, username)
{
  var token = jwt.sign({ username : username }, process.env.TOKEN_SECRET);
    let dr = {token:token}
    res.json(dr);
}

module.exports = { createToken };
