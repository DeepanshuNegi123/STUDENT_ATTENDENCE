import express from "express";
import morgan from "morgan";
import cors from "cors";
import authenticate from "./routes/authenticate.js";
import router from "./routes/authenticate.js";
const app = express(); 
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(morgan("combined")); // Used morgan logger for the requests and responses.


app.use("/api/auth", authenticate); 


app.get("/", (req, res) => {
    res.send("Hello World!");
});


export default app;