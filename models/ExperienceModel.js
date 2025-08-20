const mongoose = require('mongoose')

const ExperienceSchema = new mongoose.Schema({
    date : {
        type : String,
        required : true,
    },
    ins : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true
    }
})

const Experience = mongoose.model('Experience',ExperienceSchema);

module.exports = Experience;