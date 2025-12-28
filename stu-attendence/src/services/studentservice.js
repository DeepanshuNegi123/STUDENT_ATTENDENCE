

const token = localStorage.getItem(token);
const studentattendancedata = async ()=>{

const data = await fetch('http://localhost:5008/api/student/attendance',{
    
    method:"GET",
    headers:{
        Authorization:`Bearer ${token}`
    }
}
)
}

export default studentattendancedata