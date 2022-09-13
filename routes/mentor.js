const express=require('express');
const router=express.Router();


const {mentor}=require('../mongoose/db');


router.get('/getAllMentors',async function(req,res){

    console.log('get all the mentors');
try{
    const data=await mentor.find();
    res.send(data);
}catch(e)
{
 console.log(e,'error');
 res.status(400).send(e);
}});


router.post('/createMentor',async function(req,res)
{
    console.log('mentors create route');
    try{
        const data=await mentor.create(
            {
                name:req.body.name,
                email:req.body.email,
                expertIn:req.body.expertIn,
                studentsAssigned:req.body.studentsAssigned,
            }
        );
        res.send(data);
    } catch(e)
    {
        console.log(e.message,'error');
        res.status(500).send('error while creating');
    }
});


router.get('/getAllMentors/:id',async function(req,res)
{
    console.log('show all the students for particular mentor');
    try{
        const ment=await mentor
        .findById(req.params.id)
        .populate('studentsAssigned','name');

        res.send(ment);
    }
    catch(e)
    {
        console.log(e,'error');
        res.status(500).send('error to get all the students for this particular mentor');

    }
});

module.exports=router;