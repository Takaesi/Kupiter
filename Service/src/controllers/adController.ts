import { Request, Response } from "express";
import {createAdDB} from "../services/adService"
import { getAllAdsUser } from "../services/adService";
import { deleteAdUser } from "../services/adService";
import { getAllAdsDB } from "../services/adService";

export const createAd = async (req: Request, res: Response) => {
    const userId = req.user?.id

    if (!userId) {
        return res.status(401).json({ message: "Пользователь не авторизован" });
    }

    try {
        const answer = await createAdDB(userId, req.body)
        return res.status(201).json(answer)
    } catch(e: any) {
        return res.status(400).json({message: e.message || "Ошибка сервера"})

    }
}

export const getAlladsUser = async (req: Request, res: Response) => {
    const userId =req.user?.id

    if(!userId) {
        return res.status(401).json({message: "Пользователь не авторизован"})
    }

    try {
        const answer = await getAllAdsUser(userId)
        return res.status(201).json(answer)
    } catch(e: any) {
        return res.status(400).json({message: e.message || "Ошибка сервера"})
    }
}

export const deleteAd = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    console.log("req.params.id:", id, "typeof:", typeof id);

    try {
        await deleteAdUser(id)
        return res.status(201).json({message: "Объявление удалено"})
    } catch(e: any) {
        console.log(e)
        return res.status(400).json({message: e.message || "Ошибка сервера"})
    }
}

export const getAllAds = async (req: Request, res: Response) => {


    try{
        const ads = await getAllAdsDB(req.query)
        return res.status(201).json(ads)
    }catch(e: any) {
        console.log(e)
        return res.status(400).json({message: e.message || "Ошибка сервера"})
    }

}

