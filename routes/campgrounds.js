var express = require("express"),
    router = express.Router(),
    Campground = require("../models/campground"),
    middleware = require("../middleware");

// *** INDEX display a list of all campgrounds
router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

// *** CREATE post route where we add new campground to database
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image: image, description: description, author: author};  
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect("/campgrounds"); 
        }
    });      
});

// *** NEW displays form to make a new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

// *** SHOW shows more info about one campground using ID in the url
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "Couldn't find that campground.");
            res.redirect("/campgrounds");
        } else{
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// *** EDIT displays form to edit
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){                  
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
            req.flash("error", "Couldn't find that campground.");
            res.redirect("/campgrounds");
        } else{
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

// *** UPDATE submit the edit form
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){      
        if(err){
            req.flash("error", "Couldn't find that campground.");
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Campground successfully edited.");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// *** DESTROY remove/delete campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            req.flash("error", "Couldn't find that campground.");
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Campground successfully deleted.");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;
