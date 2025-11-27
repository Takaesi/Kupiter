import {Router} from "express";
import { createAd } from "../controllers/adController";
import { authMiddlewar } from "../middleware/checkToken";
import { getAlladsUser } from "../controllers/adController";
import { deleteAd } from "../controllers/adController";

const router = Router()

router.post("/createAd", authMiddlewar,  createAd)
router.get("/getAllAds", authMiddlewar, getAlladsUser)
router.delete("/deleteAd",authMiddlewar, deleteAd )

export default router