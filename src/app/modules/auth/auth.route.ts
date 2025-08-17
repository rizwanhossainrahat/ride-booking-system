import { Router } from "express";
import { authContoller } from "./auth.controller";


const router=Router()

router.post("/login",authContoller.creadentialsLogin)
router.post("/refresh-token",authContoller.getNewAccessToken)
router.post("/logout",authContoller.logout)

export const AuthRouter=router 