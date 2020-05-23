import express from 'express';
import User from '../model/userModel.js';
import Joi from '@hapi/joi';

let auth = express.Router();


//validate data before we a user  
        const schema = Joi.object({
        username:Joi.string().min(5).required(),
        email:Joi.string().min(6).required().email(),
        password:Joi.string().min(8).required()
    });


auth.post('/register', async (req, res)=>{
    // res.send('Register');
    
    const {error} = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    // res.send(error.details[0].message);

    const user = new User({
        username:req.body.username,
        password:req.body.password,
        email:req.body.email
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
});

auth.post('/login',(req, res)=>{
    res.send('Register');
});


export default auth;