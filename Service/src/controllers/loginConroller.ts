import { Request, Response} from "express"
import * as loginService from "../services/loginService"
import { error } from "console"


export const loginUser = async (req: Request, res: Response) => {
    try {
        const answer = loginService.loginUser(req.body)
        return res.status(200).json(answer)
    } catch(e: any){
        return res.status(401).json({error: e.message})
    }
}

