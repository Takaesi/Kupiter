import bcrypt from "bcrypt";
import { prisma } from "../db";
import { generateToken } from "../utils/jwt";

export async function registerUserDB(data:any) {
    try {
        const {firstName, lastName, password, city, phone, email} = data

        const checkEmail = await prisma.user.findUnique({
            where: {email}
        })

        if (checkEmail) throw new Error("email уже занят")
        
        const hash = await bcrypt.hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                city,
                phone,
                email,
                password: hash
            }
        })

        const token = generateToken(newUser.id)

        const answer = {
            id: newUser.id,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email,
            city: city,
            token: token

        }

        return answer
        
    } catch(e: any) {
        console.error(e)
        throw e
    }
}

export async function loginUserDB(data: any) {
    try {
    const {password, email} = data

    const getUser = await prisma.user.findUnique({
        where: {email},
        select: {
            id: true,
            firstName: true,
            lastName: true,
            password: true,
            email: true,
            city: true,
            phone: true,
            createdAt: true
        }
    })

    if (!getUser) {
        throw new Error("Неверный email или пароль")
    }
        
    const userCheckPassword = await bcrypt.compare(password, getUser.password)

    if (!userCheckPassword) {
        throw new Error("Неверный email или пароль")
    }
   
    const answer = {
        id: getUser.id,
        firstName: getUser.firstName,
        lastName: getUser.lastName,
        token: generateToken(getUser.id),
        email: getUser.email,
        city: getUser.city,
        phone: getUser.phone,
        createdAt: getUser.createdAt
    }

    return answer

    }catch(e: any) {
        console.error(e)
        throw e
    }
}