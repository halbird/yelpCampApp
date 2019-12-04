var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");

var data = [
    {
        name: "1stCampground1",
        image: "https://www.nps.gov/shen/planyourvisit/images/20170712_A7A9022_nl_Campsites_BMCG_960.jpg?maxwidth=1200&maxheight=1200&autorotate=false",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non dolorem molestias dignissimos est impedit ea voluptatem dolor id voluptatum velit nihil quam debitis doloribus at quis eveniet expedita autem nostrum accusantium doloremque vel officiis, reiciendis consequatur? Nihil minus cupiditate deserunt animi sint magni nemo fugiat corporis iure velit magnam voluptates nostrum, dolorem voluptatum error autem possimus tempora asperiores debitis soluta nesciunt facilis vel fuga similique? Beatae, libero dignissimos, et iure recusandae ex commodi dicta nobis minus iste aliquam corporis? Sequi explicabo vel ratione expedita modi cum beatae dignissimos laboriosam quod, maxime sint magni iste iure consectetur, vitae vero et eos?"
    },
    {
        name: "2ndCampground2",
        image: "https://assets.simpleviewinc.com/simpleview/image/fetch/c_fill,h_452,q_75,w_982/http://res.cloudinary.com/simpleview/image/upload/v1469218578/clients/lanecounty/constitution_grove_campground_by_natalie_inouye_417476ef-05c3-464d-99bd-032bb0ee0bd5.png",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non dolorem molestias dignissimos est impedit ea voluptatem dolor id voluptatum velit nihil quam debitis doloribus at quis eveniet expedita autem nostrum accusantium doloremque vel officiis, reiciendis consequatur? Nihil minus cupiditate deserunt animi sint magni nemo fugiat corporis iure velit magnam voluptates nostrum, dolorem voluptatum error autem possimus tempora asperiores debitis soluta nesciunt facilis vel fuga similique? Beatae, libero dignissimos, et iure recusandae ex commodi dicta nobis minus iste aliquam corporis? Sequi explicabo vel ratione expedita modi cum beatae dignissimos laboriosam quod, maxime sint magni iste iure consectetur, vitae vero et eos?"
    },
    {
        name: "3rdCampground3",
        image: "https://www.nps.gov/mora/planyourvisit/images/OhanaCampground2016_CMeleedy_01_web.jpeg?maxwidth=1200&maxheight=1200&autorotate=false",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non dolorem molestias dignissimos est impedit ea voluptatem dolor id voluptatum velit nihil quam debitis doloribus at quis eveniet expedita autem nostrum accusantium doloremque vel officiis, reiciendis consequatur? Nihil minus cupiditate deserunt animi sint magni nemo fugiat corporis iure velit magnam voluptates nostrum, dolorem voluptatum error autem possimus tempora asperiores debitis soluta nesciunt facilis vel fuga similique? Beatae, libero dignissimos, et iure recusandae ex commodi dicta nobis minus iste aliquam corporis? Sequi explicabo vel ratione expedita modi cum beatae dignissimos laboriosam quod, maxime sint magni iste iure consectetur, vitae vero et eos?"
    }
]

function seedDB(){
// remove all campgrounds from DB
    Campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds");
        // add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a campground");
                    // create a comment for each campground
                    Comment.create({
                        text: "This is pretty but no bathroom.",
                        author: "Homer"
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("created new comment");
                        }
                    })
                }
            });
        });

    });
};




module.exports = seedDB;
