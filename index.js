// index.js -- server side 
import bodyParser from 'body-parser';
import express from 'express';
import authUser from './routes/authUser.js ';
import * as mongoose from "mongoose";

const app = express();
const port = 4000;

//connect db
// mongoose.connect('mongodb://localhost:27017/myDB',{ useNewUrlParser: true, 
//     useUnifiedTopology: true,
//     useCreateIndex:true,
//                useFindAndModify: false  });

//Route Middlewares
app.use('/api/user',authUser);

app.use(bodyParser.urlencoded({ // Middleware
    extended: true
}));
app.use(bodyParser.json()); // for parsing application/json

// entry route for root / request
app.get('/', (req, res) => {
    res.end("Hello World Test");
})

const restaurant = [
    {res_id:'001', res_name:'ก๋วยเตี๋ยวนายเกรียง', res_rate:'5.0', res_desc:'ร้านก๋วยเตี๋ยวที่เปิดมานานกว่า 10 ปี', res_place:'หน้าตึก twin town', res_opcl:'17:00-22:00น.', res_tel:'081-234-5679', res_img:'img001'},
    {res_id:'002', res_name:'ก๋วยเตี๋ยวยกซด', res_rate:'5.0', res_desc:'ร้านก๋วยเตี๋ยวเรือที่ดังที่สุดในย่าน', res_place:'ใต้หออินเตอร์พาร์ค', res_opcl:'10:00-21:00น.', res_tel:'082-222-2222', res_img:'img002'},
    {res_id:'003', res_name:'ข้าวมันไก่ป้ายแดง', res_rate:'4.9', res_desc:'ข้าวมันไก่ใต้ก้ำ', res_place:'ใต้ก้ำ', res_opcl:'17:00-22:00น.', res_tel:'083-333-3333', res_img:'img003'},
    {res_id:'004', res_name:'ลุงโย่ง', res_rate:'4.9', res_desc:'หมูกรอบหมดทุกรอบที่ไปกิน', res_place:'ใต้หออินเตอร์พาร์ค', res_opcl:'09:00-20:00น.', res_tel:'084-444-4444', res_img:'img004'},
    {res_id:'004', res_name:'อาหารคลีน', res_rate:'3.5', res_desc:'ร้านรวมอาหารคลีนเด็ด ๆ', res_place:'ใต้หออินเตอร์พาร์ค', res_opcl:'12:00-19:00น.', res_tel:'085-555-5555', res_img:'img005'}
];

app.get('/home', (req, res) => {
    res.json(restaurant);
})


app.post('/admin/add-res', (req, res) => {
    restaurant.push(req.body)
    res.status(201).json(req.body)
  })


// make server start listening on a specified port
app.listen(port, () => console.log(`Server started at port ${port}`));
