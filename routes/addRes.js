import express from 'express';
import Joi from '@hapi/joi';
import Res from '../model/restaurantModel.js';

let AddRes = express.Router();

//-----------------------------------Add Restaurant-----------------------------------

const schemaForRes = Joi.object({
    res_name:Joi.string().min(10).required(),
    res_place:Joi.string().min(10).required(),
    res_desc:Joi.string().min(10).required(),
    res_rate:Joi.string().required(),
    res_op_cl:Joi.string().min(10).required(),
    res_tel:Joi.string().required()
    // res_img:Joi.string().min(8).required()
});

AddRes.post('/restauAdmin', async (req, res)=>{
    
    //create a new Restaurant
    const resta = new Res({
        res_name:req.body.res_name,
        res_place:req.body.res_place,
        res_desc:req.body.res_desc,
        res_rate:req.body.res_rate,
        res_op_cl:req.body.res_op_cl,
        res_tel:req.body.res_tel
    });
    try{
        const savedResta = await resta.save();
        res.send({resta:resta._id});
    }catch(err){
        res.status(400).send(err);
    }
})
export default AddRes;