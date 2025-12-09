let user1 = {

user:"deepanshu",
pass:"jessy2342@ox",
  about: "<script>alert('hacked')</script>Hello <b>friend</b>",

   profile: {
    bio: "<img src=x onerror=alert('xss')>",
    "$ne": "This is mongo injection!"
  }



};


function trimit(){

for(let key in user1){ 

// console.log(user1[key]); // prints the value of the key
// console.log(typeof(user1[key]));

if(typeof(user1[key]) === "string"){

    user1[key] = user1[key].trim(); // removes extra spaces before and aftre the string 
    console.log(user1[key]);
    console.log(typeof(user1[key]));
}

}

console.log(typeof(user1));

}

function removescripts(){
     for (let key in user1){
       
         if(typeof(user1[key]) === "string"){


            user1[key] = user1[key].replace(/<script[^>]*>(.*?)<\/script>/g, '');
            console.log(user1[key]);
            console.log(typeof(user1[key]));

         }
    }
}

function escapehtml (){
// replace(pattern , replacemant)
// pattern : - a string , a regular expression 
// replacement - a string matched the pattern gets replaced 

    for(let key in user1){

     if(typeof user1[key] === "string"){

          user1[key] = user1[key].replace(/&/g, "&amp;");
          console.log(user1[key]);

     }
    }

    for (let key in user1){

     if(typeof user1[key] == "object"){
        console.log(user1[key]);

        
        // user1[key] = user1[key].replace("$","&amp;")
     }



    }
}

// escapehtml();

// recursive filtering

function recursivefilter( user1){

    
for ( let key in user1){

    if(typeof user1[key] == "object"){


    recursivefilter(user1[key]);
    }
    
    else{
        
            if(typeof user1[key] =="string"){
                console.log(user1[key]);
            }
        
    }
    
}


}

recursivefilter(user1);