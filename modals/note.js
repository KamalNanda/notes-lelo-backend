const mongoose = require('mongoose')

const Schema = mongoose.Schema

const notesSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
    link : {
        type : String,
        required : true
    },
    subject : {
        type : String.
        required : true
    },
    semester : {
        type: Number,
        required : true
    },
    course : {
        type  : String,
        required : true
    }
})

module.exports = mongoose.model("Notes" , notesSchema)
