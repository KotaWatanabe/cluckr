const express = require("express");
const router = express.Router();
const knex = require("../db/client");

router.get("/",(req, res)=>{
   if(!req.cookies.username){
    res.redirect("/sign_in")
    } 
    knex("clucks")
    .where({
        username: req.cookies.username
    })
    .orderBy("createdAt", "DESC")
    .then(clucks =>{
        res.render("clucks/index", {clucks:clucks});
    });
});

  router.get("/new", (req, res) => {
      if(req.cookies.username){
        res.render("clucks/new");
      }else{
          res.redirect("/sign_in")
      } 
  });

  router.post("/", (req, res) => {
    knex("clucks")// --- START SQL
    .insert({
        username:req.cookies.username,
        content: req.body.content,
        image_url: req.body.image_url,
    })
    .returning("*")// --- END SQL
    .then(data => {
        const cluck = data[0];
        ///-- EXECUTE SQL
        res.redirect("/clucks");
    });

  });

  module.exports = router;