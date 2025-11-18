import { Router } from "express" 
import { addUser } from "../controllers/registerController"   

const router = Router()

router.post("/register",addUser )

export default router