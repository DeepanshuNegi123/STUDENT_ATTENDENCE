import { useEffect } from "react"
import { useNavigate } from "react-router-dom";


const   Unauthorised = ()=>{

    const navigate = useNavigate();

    useEffect(()=>{


const timer = setTimeout(() => {

    navigate('/login');

    
}, 4000);

return()=>clearTimeout(timer);

    },[navigate])



return(



<div className="">
    <h1>please come with valid authorisation .</h1>
   
</div>




)


}

export default Unauthorised