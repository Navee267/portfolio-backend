const mongoose = require('mongoose');
require('dotenv').config()

const connectToDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected to ${mongoose.connection.host}`);
    }
    catch(err){
        console.log("MongoDB Connection Failed");
        process.exit(1);
    }
}

module.exports = connectToDB;