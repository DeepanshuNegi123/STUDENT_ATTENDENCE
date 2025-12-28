import express from "express";
import morgan from "morgan";
import cors from "cors";
import authenticate from "./routes/authenticate.js";
import teacherroutes from "./routes/teacherroutes.js";
import adminroutes from "./routes/adminroutes.js";
import studentroutes from "./routes/studentroutes.js"

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(morgan("combined"));

app.use("/api/auth", authenticate);
app.use("/api/teacher", teacherroutes);
app.use("/api/admin", adminroutes);
app.use("/api/student",studentroutes);

app.get("/", (req, res) => {
    res.send("Hello guys");
});

export default app;