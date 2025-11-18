import bcrypt from "bcrypt";
import { prisma } from "../db";
import { generateToken } from "../utils/jwt";

export async function addUser(data:any) {
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