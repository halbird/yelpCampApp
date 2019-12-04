var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,       // just like in campground
            ref: "User"     // refers to the model we're going to refer to with the model ID
        },
        username: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);