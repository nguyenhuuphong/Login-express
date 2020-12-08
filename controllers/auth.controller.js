var express = require("express");
var db = require('../db');
const shortid = require("shortid");
var cookieParser = require('cookie-parser');


module.exports.login = function (req, res) {
  res.render("login");
};
module.exports.postLogin = function (req, res, next){
	var email = req.body.email ;
	var password = req.body.password;

	var user = db.get('user').find({email: email}).value();

	if(!user){
		res.resder('login', {
			errors: [
                'email không tồn tại ...-_-'
			],
			values: req.body
		})
		return;
	}
	if (user.password !== password){
		res.render('login',{
			errors: [
			'sai mật khẩu']
		})
		return;
	}
	res.cookie('cookie', user.id);
	res.redirect('/');
}