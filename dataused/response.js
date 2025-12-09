

// here we  have a  raw object and we cannot send it over internet directly so we have to stringify it and send it

const signupdata = {
    fullname : "sahil",
    email: "sahil@123",
    password: "sahil@123",
    phone: "1234567890",
    role: "student"
}

const jsondata = JSON.stringify(signupdata);

console.log(jsondata);

// backend 
// app.use(express.json()); // THIS IS A MIDDLEWARE FUNCTION WHICH WILL PARSE THE JSON DATA FROM THE REQUEST BODY AND PUT IT INTO THE req.body OBJECT


console.log(JSON.parse(jsondata)); // WE HAVE PARSED THE JSON DATA AND PUT IT INTO THE req.body OBJECT.



const obj = { name: "John", age: 25 };
const stringified = obj.toString();

console.log(stringified);  // Output: "[object Object]"
console.log(JSON.stringify(stringified));





