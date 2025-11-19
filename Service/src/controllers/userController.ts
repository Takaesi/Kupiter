import { Request, Response } from "express";
import {registerUserDB, loginUserDB} from "../services/userService"



export const registerUser = async (req: Request, res: Response) => {
    try {
        const answer = await registerUserDB(req.body)
        return res.json(answer)
    } catch(e: any){
        if (e.message === "email уже занят") {
            return res.status(400).json({ error: e.message });
        }

    return res.status(500).json({ error: "Server error" });
    }
}



export const loginUser = async (req: Request, res: Response) => {
    try {
        const answer = await loginUserDB(req.body)
        return res.status(200).json(answer)
    } catch(e: any){
        return res.status(401).json({error: e.message})
    }
}