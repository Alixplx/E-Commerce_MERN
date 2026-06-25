import userModel from "../models/userModel.ts"
import bycrypt from "bcrypt"
import jwt from "jsonwebtoken"


interface RegisterParams {

    firstName: string
    lastName: string
    email: string
    password: string
}

interface LoginParams {

    email: string
    password: string
}


export const register = async ({firstName, lastName, email, password}: RegisterParams) => {

    const findUser = await userModel.findOne({ email})

    if (findUser) {

        return { data: "User Already Exists!", statusCode: 400}
    }

    const hashedPass = await bycrypt.hash(password, 10)

    const newUser = new userModel({firstName, lastName, email, password: hashedPass})
    await newUser.save()

    return {data: generateJWT({firstName, lastName, email}), statusCode: 200}
}


export const login = async ({ email, password}: LoginParams) => {

    const findUser = await userModel.findOne({ email})

    if (!findUser) {

        return { data: "Incorrect Email or Password!", statusCode: 400}
    }

    const passMatch = await bycrypt.compare(password, findUser.password)

    if (passMatch) {

        return { data: generateJWT({ email, firstName: findUser.firstName, lastName: findUser.lastName}), statusCode: 200}
    }

    return { data: "Incorrect Email or Password!", statusCode: 400}
}

const generateJWT = (data: any) => {

    return jwt.sign(data, "358ZLY7VK8iJdAkwV1P1qKBnE2fgqSB5", { expiresIn: "24h"})
}