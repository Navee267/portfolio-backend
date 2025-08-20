const mongoose = require('mongoose')

const EducationSchema = new mongoose.Schema({
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

const Education = mongoose.model('Education',EducationSchema);

module.exports = Education;