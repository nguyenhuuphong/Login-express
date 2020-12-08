var express = require("express");
var db = require('../db');
const shortid = require("shortid");



module.exports.index = function (req, res) {
  var users = db.get('user').value();
  res.render("user", {
      users
  });
};

// add new user
module.exports.add = function(req, res) {
  res.render("useradd");
};

module.exports.addPost = function (req, res){
  req.body.id = shortid.generate();
   
  var errors = []

  if (!req.body.name || req.body.name.length > 30){
    errors.push("Name is required")
  }
  if ( req.body.name.length > 30){
    errors.push("tên bạn dài hơn 30 ký tự")
  }
  if (!req.body.age){
    errors.push("Age is required")
  }
  if (!req.body.age || req.body.age < 18 ){
    errors.push("xin lỗi bạn chưa đủ 18+")
  }
  if (errors.length){
     res.render("useradd",{
      errors: errors,
      values: req.body
     });
     return;
   }
   db.get('user')
      .push(req.body)
      .write(); 
    res.redirect("/user");
  
};
// xóa người thuê
module.exports.idDelete = function (req, res){
  var id = req.params.id;
  var getData =  db
     .get("user")
    .remove({ id: id })
    .write();

  res.redirect("/user")
  };
// show thông tin
module.exports.show = function (req, res){
  var getId = req.params.id;
  var getData = db
    .get("user")
    .find({ id: getId })
    .value();

  res.render("usershow", {
    user: getData
  });
};

