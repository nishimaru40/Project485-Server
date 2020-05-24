import express from 'express';
import verify from './verifyToken.js';

let posts = express.Router();

posts.get('/', verify ,(req,res)=>{
    res.send(req.user);
    // User.findbyOne({_id:req.user});
})



export default posts;