import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import userRoute from "./routes/userRoute"
import adRoute from "./routes/adRoute"


dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api", userRoute)
app.use("/api", adRoute)


app.get("/api/health", (req, res) => {
    res.json({status: "ok"})
}) 

app.listen("3000", () => console.log("start on 3000"))