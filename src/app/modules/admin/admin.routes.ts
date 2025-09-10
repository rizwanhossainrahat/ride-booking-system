import { Router } from "express";
import { AdminAContorller } from "./admin.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";

const router=Router()

router.get("/get-all-rider",checkAuth(Role.ADMIN),AdminAContorller.getAllRider)
router.get("/get-all-driver",checkAuth(Role.ADMIN),AdminAContorller.getAllDriver)
router.delete("/delete-rider/:id",checkAuth(Role.ADMIN),AdminAContorller.deleteRider)
router.delete("/delete-driver/:id",checkAuth(Role.ADMIN),AdminAContorller.deleteDriver)

export const AdminRouters=router 