const mongoose=require('mongoose');
const schema=mongoose.Schema;


const dbConnect = async () => {
    try {
      await mongoose.connect(
       MONGO_URL=process.env.MONGO_URL,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          autoIndex: true,
        }
      );
      console.log("DB Connected");
    } catch (e) {
      console.log(e.message, "error in connecting db");
    }
  };


  const studentSchema=schema(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        course:{
            type:String,
            required:true,
        },
        mentorAssigned:
        {
            type:schema.Types.ObjectId,
            default:null,
            ref:'mentor',

        },
    }
  );


  const student=mongoose.model('student',studentSchema,'student');

  const mentorSchema=schema(
    {
        name:{
            type:String,
            required:true
        },
        email:
        {
            type:String,
            required:true,
            unique:true

        },
        expertIn:
        {
            type:String,
            required:true,
        },
        studentsAssigned:
        [
            {
            type:schema.Types.ObjectId,
            ref:'student',
            default:null,
        },
    ],
    

    }
  );


  const mentor=mongoose.model('mentor',mentorSchema,'mentor');
  module.exports={dbConnect,student,mentor};