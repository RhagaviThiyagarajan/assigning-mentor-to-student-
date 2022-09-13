const router=require('express').Router();
const objectId=require('mongoose').Types.ObjectId;


const{student,mentor}=require('../mongoose/db');


router.post('/newMentor', async(req,res)=>
{
    console.log('assignMentorToStudent');
    try{
        const mentorData=await mentor.findById(req.body.mentorId);
        mentorData.studentsAssigned=[
            ...mentorData.studentsAssigned,
            ...req.body.studentsArray,
        ];

        mentorData.save();
        req.body.studentsArray.forEach(async(stud)=>
        {
            const temp=await student.findById(stud);
            temp.mentorAssigned=req.body.mentorId;
            temp.save();
        });
        res.send('Mentor added and updated');
    }
    catch(e)
    {
        console.log(e,'error in assigning mentor');
        res.status(400).send(e);
    }
    }
);

//changing mentorassigned to new value in students
router.post('/modifyMentor',async(req,res)=>
{
    console.log('select one student and assign mentor');
    try{
        let stud=await student.findById(req.body.studentId);
        const oldMentorId=stud.mentorAssigned;
        stud.mentorAssigned=req.body.newMentorId;
        stud.save;


        // remove the student from old mentor and assign to new mentor


        let oldment=mentor.findById(oldMentorId);
        if(oldment.studentId.length<0)
        {
            console.log('oldment');
            return;
        }
        else{
            let newAssigned=oldment.studentsAssigned;
            const indexpos=newAssigned.indexOf(objectId(req.body.studentId));
            console.log(indexpos,'index');
            newAssigned.pop(indexpos);
            console.log(newAssigned);
            oldment.studentsAssigned=newAssigned;
        }
        oldment.save();

//add the studentId in new mentor 

let newment=mentor.findById(req.body.newMentorId);
if(newment.studentsAssigned.length<0)
{
    return;

}
else{
    if(!newment.studentsAssigned.includes(req.body.studentId))
    {
        newment.studentsAssigned=[
            ...newment.studentAssigned,
            req.body.studentId,
        ];
        
    }
}

newment.save();
res.send('updated  mentor to each student,old mentor is replaced ith new mentor');

        }
        catch(e)
        {
            console.log(e,'error');
            res.status(400).send('error in assigning students for mentor');
        }
        });

        module.exports=router;
    
