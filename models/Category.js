const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }

});

module.exports = mongoose.model("Category", categorySchema);
