const express=require('express');
const router=express.Router();


const {student,mentor}=require('../mongoose/db');

router.get('/',async function(req,res)
{
    console.log('get all the students');
try{
    const data=await student.find();
    res.send(data);
}
catch(e)
{
    res.send(e);
}
});


router.post('/createStudent', function(req,res)
 
 {
     console.log('students create route');
     try{
         const data= student.insert(
             {
                 name:req.body.name,
                 email:req.body.email,
                 course:req.body.course,
                 mentorAssigned:req.body.mentorAssigned,
             }
         );
         res.send(data);
     }catch(e)
     {
         console.log(e.message,'error');
         res.status(500).send('error while creating');
     }
});


module.exports=router;