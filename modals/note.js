const mongoose = require('mongoose')

const Schema = mongoose.Schema

const notesSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("Notes" , notesSchema)