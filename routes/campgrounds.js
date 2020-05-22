const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware");


// INDEX:- display list of all campgrounds
router.get("/",(req,res)=>{
	//get all campgrounds from databases
	Campground.find({},(error,allCampgrounds)=>{
		if(error){
			console.log(error);
		}else {
			res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser: req.user});	
		}
	})

});
// CREATE:- add new campground to db
router.post("/",middleware.isLoggedIn,(req,res)=>{
	const name = req.body.name;
	const price = req.body.price;
	const image = req.body.image;
	const desc = req.body.description;
	const author = {
		id: req.user._id,
		username: req.user.username
	}
	const newCampground = {name:name,price:price,image:image,description: desc, author: author};
	// create a new campground and save to db
	Campground.create(newCampground,(err,newlyCreated)=>{
		if(err){
			console.log(err);
		}else{
			//redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	})
});
// NEW:- display form to insert new campground
router.get("/new",middleware.isLoggedIn, (req,res)=>{
	 res.render("campgrounds/new");
});
//SHOW:- show more info about particular campground
router.get("/:id",(req,res)=>{
	//find the campground with provided id
	Campground.findById(req.params.id).populate("comments").exec((err,foundCampground)=>{
		if(err){
			console.log(err);
		}else {
			//render show template with that campground
			res.render("campgrounds/show",{campground: foundCampground});
		}
	})
	
});
//EDIT campground route
router.get("/:id/edit",middleware.checkCampgroundOwnership,(req,res)=>{
	
	Campground.findById(req.params.id,(err,foundCampground)=>{
		res.render("campgrounds/edit",{campground: foundCampground});
	});
});
//UPDATE campground route

router.put("/:id", middleware.checkCampgroundOwnership,(req,res)=>{
	//find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id,req.body.campground, (err, updatedCampground)=>{
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	})
});

//DESTROY campground route

router.delete("/:id",middleware.checkCampgroundOwnership,(req,res)=>{
	 Campground.findByIdAndRemove(req.params.id, (err)=>{
		 if(err){
			 res.redirect("/campgrounds");
		 }else{
			 res.redirect("/campgrounds");
		 }
	 })
})



module.exports = router;