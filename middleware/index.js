var middlewareObj = {},
    Campground = require("../models/campground"),
    Comment = require("../models/comment");

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){                  
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err || !foundCampground){
                req.flash("error", "Couldn't find that campground.");
                res.redirect("back"); 
            } else {
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You can only edit your own campgrounds.");
                    res.redirect("/campgrounds/" + req.params.id);
                }
            }
        });
    } else {
        req.flash("error", "You must be logged in to access that.");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){                  
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "Couldn't find that comment.");
                res.redirect("back"); 
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You can only edit your own comments.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You must be logged in to access that.");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();             
    }
    req.flash("error", "You must be logged in to access that.");
    res.redirect("/login");          
}

module.exports = middlewareObj;