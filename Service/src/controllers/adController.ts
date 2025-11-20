import { Request, Response } from "express";
import {createAdDB} from "../services/adService"

export const createAd = async (req: Request, res: Response) => {
    const userId = req.body.id
    try {
        const answer = await createAdDB(userId, req.body)
        return res.status(201).json(answer)
    } catch(e: any) {
        return res.status(400).json({message: e.message || "Ошибка сервера"})
    }
}