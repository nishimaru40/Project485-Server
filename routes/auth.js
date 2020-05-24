import express from 'express';
import User from '../model/userModel.js';
import Joi from '@hapi/joi';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

let auth = express.Router();

//-----------------------------------Register-----------------------------------
//validate of register  
    const schemaForRegis = Joi.object({
    username:Joi.string().min(5).required(),
    email:Joi.string().min(6).required().email(),
    password:Joi.string().min(8).required()
});
auth.post('/register', async (req, res)=>{
    // res.send('Register');
    
    //validation 
    const {error} = schemaForRegis.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    // res.send(error.details[0].message);
    
    //checking if the user is already in the db
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('Email นี้ใช้แล้ว');

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create a new user 
    const user = new User({
        username:req.body.username,
        password:hashedPassword,
        email:req.body.email
    });
    try{
        const savedUser = await user.save();
        res.send({user:user._id});
    }catch(err){
        res.status(400).send(err);
    }
});

//-----------------------------------Login-----------------------------------
//validate of login 
const schemaForLogin = Joi.object({
    email:Joi.string().min(6).required().email(),
    password:Joi.string().min(8).required()
});

auth.post('/login', async (req, res)=>{
    const {error} = schemaForLogin.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    //checking if email exist
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('อีเมล์ไม่ถูกต้อง');
    
    //password correct
    const vaildPass = await bcrypt.compare(req.body.password, user.password);
    if(!vaildPass) return res.status(400).send('รหัสผ่านไม่ถูกต้อง')
        
    //create and assign a token
    const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token);
    


    
    res.send('Login สำเร็จ');

});






export default auth;