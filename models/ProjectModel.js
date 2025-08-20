const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    link : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    file : [
        {
            fileName : String,
            path : String
        }
    ]
})


const works = mongoose.model('works',projectSchema);

module.exports = works;