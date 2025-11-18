import { Request, Response } from "express";
import * as registerService from "../services/registerService"



export const addUser = async (req: Request, res: Response) => {
    try {
        const answer = await registerService.addUser(req.body)
        return res.json(answer)
    } catch(e: any){
        if (e.message === "email уже занят") {
            return res.status(400).json({ error: e.message });
        }

    return res.status(500).json({ error: "Server error" });
    }
}