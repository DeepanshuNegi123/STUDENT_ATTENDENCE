const year = new Date().getFullYear();

const random  = Math.floor(100 + Math.random()* 500);
console.log(random);
console.log(year);

function see(namee , value){


console.log(`${namee} is ${value}`);



}

see("hello" , "world");