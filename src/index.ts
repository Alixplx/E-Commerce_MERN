import express from "express"
import mongoose from "mongoose"
import userRoute from "../src/routes/userRoute.ts"


const app = express()
const port = 3001

app.use(express.json())

// 127.0.0.1 == localhost
mongoose
    .connect("mongodb://localhost:27017/ecommerce")
    .then(() => console.log("Connected"))
    .catch((err) => console.log("Failed to Connect", err))


app.use("/user", userRoute)


app.listen(port, () => {

    console.log(`Server is running at http:/localhost:${port}`)
})