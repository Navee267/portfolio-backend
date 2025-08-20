
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const upload = require('../middlewares/multerConfig');

require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY;

router.post('/', upload.none(), async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.clearCookie('token')
            return res.status(404).json({ message: 'User Not Found' })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.clearCookie('token');
            return res.status(400).json({ message: "Invalid Password" });
        }

        const token = jwt.sign(
            {id : user._id,email : user.email,role : user.role,name : user.name},
            SECRET_KEY,
            {expiresIn : '1h'}
        )

        res.cookie('token',token,{
            httpOnly : true,secure : false,sameSite : 'lax',maxAge : 60 * 60 * 1000
        })

        res.status(200).json({message : 'LOGIN Successfull With Cookies',token : token})
    }
    catch(err){
        res.status(500).json({error : err.message})
    }
})

router.post('/reg',async(req,res)=>{
    const {name,role,email,password} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({name,email,role,password : hashedPassword})
        res.status(200).json({message : "Account Created Successfully"});
    }
    catch(err){
        res.status(500).json({error : err.message})
    }
})

router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
});

module.exports = router;