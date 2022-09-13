const dotenv=require('dotenv');
const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const mentorRoute=require('./routes/mentor');
const studentRoute=require('./routes/student');
const assignMentorToStudent=require('./routes/assignMentortoStudent');

const {dbConnect}=require('./mongoose/db');


dotenv.config();
console.log(process.env.MONGO_URL);
const app=express();
app.use(express.json());

//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));




//connecting to dotenv
MONGO_URL=process.env.MONGO_URL;


//home page
app.get('/',function(req,res)
{
    res.send('WELCOME');

});
app.use('/student',studentRoute);
app.use('/mentor',mentorRoute);
app.use('/assignmentor',assignMentorToStudent);

//CONNECTING TO PORT
const port=process.env.PORT||3000;
app.listen(port,()=>console.log(`App started in ${port}`));
