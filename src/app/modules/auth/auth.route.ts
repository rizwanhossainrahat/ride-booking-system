import { Router } from "express";
import { authContoller } from "./auth.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { object } from "zod";
import { Role } from "../user/user.interface";


const router=Router()

router.post("/login",authContoller.creadentialsLogin)
router.post("/refresh-token",authContoller.getNewAccessToken)
router.post("/logout",authContoller.logout)
router.post("/change-password",checkAuth(...Object.values(Role)),authContoller.changePassword)

export const AuthRouter=router 