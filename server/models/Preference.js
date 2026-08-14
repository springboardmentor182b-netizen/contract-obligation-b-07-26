const mongoose = require("mongoose");

const preferenceSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    subtitle:{
        type:String,
        required:true
    },

    enabled:{
        type:Boolean,
        default:true
    }

},{
    timestamps:true
});

module.exports = mongoose.model(
    "Preference",
    preferenceSchema
);