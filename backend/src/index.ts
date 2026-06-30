import express from "express"
import mongoose from "mongoose"
import userRoute from "./routes/userRoute.ts"
import cartRoute from "./routes/cartRoute.ts"
import productRoute from "./routes/productRoute.ts"
import { seedInitialProducts } from "./services/productService.ts"
import dotenv from "dotenv"


dotenv.config()

const app = express()
const port = 3001


app.use(express.json())

// 127.0.0.1 == localhost
mongoose
    .connect(process.env.DATABASE_URL || "")
    .then(() => console.log("Connected"))
    .catch((err) => console.log("Failed to Connect", err))


// Seed the Products To DB
seedInitialProducts()


app.use("/user", userRoute)
app.use("/product", productRoute)
app.use("/cart", cartRoute)

app.listen(port, () => {

    console.log(`Server is running at http:/localhost:${port}`)
})