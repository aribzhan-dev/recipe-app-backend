const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    titlle : {
        type : String,
        required : true
    },
    desc : {
        type : String,
        required : true
    },
    ingredients : {
        type : [String],
        required : true
    },
    instructions : {
        type : String,
        required : true
    },
    category : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model("Recipe", recipeSchema);