import mongoose from 'mongoose';

const resSchema = new mongoose.Schema({
  res_name: {
      type: String, 
      min:10,
      max:30,
      required:true
  },
  res_place: {
      type: String, 
      min:10,
      max:30, 
      required: true 
  },
  res_desc: {
      type: String, 
      min:10,
      max:30, 
      required: true 
  },
  res_rate: {
    type: String, 
    trim: true, 
    default: "0"
  },
  res_op_cl: {
    type: String, 
    trim: true, 
    min:10,
    max:30,
    required: true
},
  res_tel: {
    type: String, 
    max:15,
    required: true,
  },
  // res_img: {image: Buffer, contentType: String},
  
//   like : [{
//     ref: 'images',
//     type: mongoose.Schema.Types.ObjectId, 
//   }],
});

const restaurantModel = mongoose.model('Res', resSchema);
export default restaurantModel;