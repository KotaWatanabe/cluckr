const express = require("express");
const router = express.Router();
const knex = require("../db/client");

router.get("/",(req, res)=>{
  if(!req.cookies.username){
    res.redirect("/sign_in")
    }
    knex("clucks")
    .orderBy("createdAt", "DESC")
    .then(clucks =>{
        res.render("clucks/index", {clucks:clucks});
    });
});
   
router.get("/sign_in", (req, res) => {
    res.render("root/sign_in");
  });

const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;
  router.post("/sign_in", (req, res) => {
    const username = req.body.username;
    res.cookie("username", username, { maxAge: COOKIE_MAX_AGE });
    res.redirect("/");
  });
 router.post("/sign_out",(req,res)=>{
    res.clearCookie("username");
    res.redirect("/clucks");
  });

  module.exports = router;