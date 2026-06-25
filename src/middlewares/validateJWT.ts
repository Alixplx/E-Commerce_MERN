import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.ts";


interface ExtendRequest extends Request {

    user?: any
}

const validateJWT = (req: ExtendRequest, res: Response, next: NextFunction) => {

    const authHeader = req.get("authorization")

    if (!authHeader) {

        res.status(403).send("Authorization Header was not provided")
        return
    }

    const token = authHeader.split(" ")[1]

    if (!token) {

        res.status(403).send("Bearer Token not found")
        return
    }

    jwt.verify(token, "358ZLY7VK8iJdAkwV1P1qKBnE2fgqSB5", async (err, payload) => {

        if (err) {

            res.status(403).send("Invalid Token")
            return
        }

        if (!payload) {

            res.status(403).send("Invalid Token Payload")
            return
        }

        const userPayload = payload as { email: string, firstName: string, lastName: string}

        // Fetch User from DB Based on payload
        const user = await userModel.findOne({ email: userPayload.email})
        req.user = user
        next()
    })

}


export default validateJWT