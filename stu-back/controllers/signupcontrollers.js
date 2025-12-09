import  bcrypt from "bcrypt";


const signupcontroller = async (req, res) => {

  try {

    const body = req.body;
    console.log(body);

  console.log("data received");

const  exist = await User.findOne({email:body.email});  // check if user already exists
if(exist){
  return res.status(400).json({error:"User already exists"});
}


// save user 
const newUser = await User.create({

  firstName:body.fullname,
  email:body.email,
  password:body.password,
  phone:body.phone,
  role:body.role
  
})



// create a profile 
if(body.role ==="teacher")

{
  await Teacher.create({userId:newUser._id});
}

else if(body.role ==="student")
  
{
  await Student.create({userId:newUser._id});
}

else if(body.role ==="admin")

{
  await Admin.create({userId:newUser._id});
}

res.status(200).json({message:"User created successfully" , role:body.role}); 

} 

  catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });

  }

};


export default signupcontroller;
