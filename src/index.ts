import express from "express"
import mongoose from "mongoose"
import userRoute from "../src/routes/userRoute.ts"
import cartRoute from "../src/routes/cartRoute.ts"
import productRoute from "../src/routes/productRoute.ts"
import { seedInitialProducts } from "./services/productService.ts"


const app = express()
const port = 3001

app.use(express.json())

// 127.0.0.1 == localhost
mongoose
    .connect("mongodb://localhost:27017/ecommerce")
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