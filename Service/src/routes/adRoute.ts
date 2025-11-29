import {Router} from "express";
import { createAd } from "../controllers/adController";
import { authMiddlewar } from "../middleware/checkToken";
import { getAlladsUser } from "../controllers/adController";
import { deleteAd } from "../controllers/adController";
import { getAllAds } from "../controllers/adController";


const router = Router()

router.post("/createAd", authMiddlewar,  createAd)
router.get("/getAllAdsUser", authMiddlewar, getAlladsUser)
router.delete("/deleteAd/:id",authMiddlewar, deleteAd )
router.get("/getAllAds", getAllAds)

export default router