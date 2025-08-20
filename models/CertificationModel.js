const mongoose = require('mongoose')

const certificationSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    provider : {
        type : String,
        required : true
    },
    link : {
        type : String,
        required : true
    }
})

const certification = mongoose.model('certifications',certificationSchema);

module.exports = certification;