var express = require("express");
var router = express.Router();
const shortid = require("shortid");
var db = require('../db');

var controller = require('../controllers/auth.controller');
// view home user
router.get("/login", controller.login );

router.post("/login", controller.postLogin);



module.exports = router;