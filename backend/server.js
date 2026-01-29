import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

import userRouter from "./routes/userRoute.js"
import taskRouter from "./routes/taskRoute.js"
import forgotPasswordRouter from "./routes/forgotPassword.js"

// app config
dotenv.config()
const app = express()
const port = process.env.PORT || 8001
mongoose.set("strictQuery", true)

// middlewares
app.use(express.json())
app.use(cors())

// db config (SAFE FIX)
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI not found in .env file")
  process.exit(1)
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connected")
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err)
  })

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/task", taskRouter)
app.use("/api/forgotPassword", forgotPasswordRouter)

// listen
app.listen(port, () =>
  console.log(`Listening on localhost:${port}`)
)
