var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    flash = require("connect-flash"),
    Campground = require("./models/campground"),
    User = require("./models/user"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds"),
// requiring routes
    commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    authenticationRoutes = require("./routes/index");

mongoose.connect("mongodb://heroku_3ng39r1n:dk6q59cuuq75vom5m3qd39qhdg@ds351628.mlab.com:51628/heroku_3ng39r1n", {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true}); //connected to and created yelpCamp DB
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.set("view engine", "ejs");

// seed the database
// seedDB();

// Passport Configuration
app.use(require("express-session")({                                
    secret: "Obi is the cutest and sweetest little brown doggo!",   
    resave: false,                                                  
    saveUninitialized: false
}));            

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));            
passport.serializeUser(User.serializeUser());                    
passport.deserializeUser(User.deserializeUser());                

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error"); 
    res.locals.success = req.flash("success"); 
    next();                                 
});

app.use("/", authenticationRoutes);
app.use("/campgrounds", campgroundRoutes); 
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, function(){
    console.log("Starting up yelpCamp server");
});