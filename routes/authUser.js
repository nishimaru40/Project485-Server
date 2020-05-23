import express from 'express';
let authUser = express.Router();


authUser.post('/register',(req, res)=>{
    res.send('Register');
});

authUser.post('/login',(req, res)=>{
    res.send('Register');
});


export default authUser;