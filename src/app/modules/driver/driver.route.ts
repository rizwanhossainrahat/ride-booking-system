import { Router } from "express";
import { driverController } from "./driver.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";

const router=Router()

router.post("/accept/:id",checkAuth(Role.DRIVER),driverController.acceptRide)
router.post('/reject/:id',checkAuth(Role.DRIVER),driverController.rejectRide)

export const DriverRoutes=router;