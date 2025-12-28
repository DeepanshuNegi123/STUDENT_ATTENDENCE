

const signupservice = async (signupData) => {

    try {

        const response = await fetch("http://localhost:5008/api/auth/signup", {

            method: "POST",
            headers: { "Content-Type": "application/json" },

            body: JSON.stringify(signupData)


        })

        if (!response.ok) {
            console.log("Signup Failed");
        }

        const back = await response.json();
        return back;

    }

    catch (error) {

        console.log(error);

    }

}


const loginservice = async (loginData) => {
    
    try {
        const res = await fetch("http://localhost:5008/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Login failed");
        }

        return data;
    } catch (error) {
        console.error("Login error:", error.message);
        return null;
    }
};





export { signupservice, loginservice };