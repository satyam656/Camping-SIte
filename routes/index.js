const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

//route routes
router.get("/",(req,res)=>{
	res.render("landing");
})

//===AUTH ROUTES===
//=================

//show a form for register
router.get("/register",(req,res)=>{
	res.render("register");		
});
// Handle Sign up logic
router.post("/register",(req,res)=>{
	const newUser = new User({username: req.body.username});
	User.register(newUser,req.body.password,(err,user)=>{
		if(err){
			req.flash("error",err.message);
			return res.render("register");
		}
		passport.authenticate("local")(req,res,()=>{
			req.flash("success","Welcome to Yelpcamp "+ user.username);
			res.redirect("/campgrounds");
		});
		
	})
});
//SHOW LOGIN form
router.get("/login",(req,res)=>{
	res.render("login");
});
router.post("/login",passport.authenticate("local",{
	
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}),(req,res)=>{
});

// LOGOUT ROUTES

router.get("/logout",(req,res)=>{
	req.logout();
	req.flash("success","Logged you out!");
	res.redirect("/campgrounds");
});


module.exports = router;