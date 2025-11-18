import { Router } from "express";
import { loginUser} from "../services/loginService";

const router = Router()

router.post("/login", loginUser)

export default router