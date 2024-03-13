const express = require("express");
const app = express();
const config = require('config');
const conn = require('../src/common/database');
const session = require("express-session");
//config view
app.set("views", config.get("app.view_folder"));
app.set("view engine", "ejs");


app.use(express.urlencoded({ extended: true }))
//config static public
app.use("/static", express.static(config.get("app.static_folder")));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: config.get("app.session_key"),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
//config router
app.use(require(config.get("app.router")));

module.exports = app;
