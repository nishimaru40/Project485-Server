import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
      type: String, 
      trim: true, 
      min:10,
      max:30,
      required: [true, 'username is required']
  },
  password: {
      type: String, 
      min:8,
      max:30, 
      required: true 
  },
  email: {
      type: String, 
      trim: true, 
      unique: [true, 'Must be uniqued'], 
      required: [true, 'email is required']
  },
  signUpDate: {
    type: Date, 
    default: Date.now()
  },
  role: {
    type: String, 
    enum: ['user', 'admin'],
    required: true,
    default: "user"
  },
//   avatar: {image: Buffer, contentType: String},
//   like : [{
//     ref: 'images',
//     type: mongoose.Schema.Types.ObjectId, 
//   }],
});

const userModel = mongoose.model('User', userSchema);
export default userModel;