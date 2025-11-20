import router from "./userRoute";
import { createAd } from "../controllers/adController";
import { authMiddlewar } from "../middleware/checkToken";

router.post("/createAd", authMiddlewar, createAd)