var express = require("express"),
    router = express.Router({mergeParams: true}),
    Campground = require("../models/campground"),
    Comment = require("../models/comment"),
    middleware = require("../middleware");

// Comments new
router.get("/new", middleware.isLoggedIn, function(req, res){
    // find campground by ID and send it through to new when rendered
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    }); 
});

// Comments create
router.post("/", middleware.isLoggedIn, function(req, res){
    // lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something went awry!");
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Comment successfully added.");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// Comments edit
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err || ! foundCampground){
            req.flash("error", "Couldn't find that campground.");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});      
            }
        });  
    });     
});

// Comments update
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment successfully edited.");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });      
});

// Comments destroy
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment successfully deleted.");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;