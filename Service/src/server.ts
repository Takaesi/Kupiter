import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import registerRoute from  "./routes/registerRoute"
import loginRoute from "./routes/loginRoute" 

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api", registerRoute)
app.use("/api", loginRoute)

app.get("/api/health", (req, res) => {
    res.json({status: "ok"})
}) 

app.listen("3000", () => console.log("start on 3000"))