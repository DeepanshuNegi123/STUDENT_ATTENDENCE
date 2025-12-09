

const signupservice = async (signupData)=>{

    try {

const response  = await fetch("http://localhost:5008/api/auth/signup",{

    method:"POST",
    headers:{"Content-Type":"application/json"},

    body:JSON.stringify(signupData)


})

if(!response.ok){
    console.log("Signup Failed");
}

const back  = await response.json();
return back;

}

    catch(error){

        console.log(error);

    }
    
    }
    
export default signupservice;