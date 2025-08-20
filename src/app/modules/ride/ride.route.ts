import { Router } from "express"
import { rideController } from "./ride.controller"
import { validateRequest } from "../../middleware/validateRequest"
import { rideCreateZodSchema } from "./ride.validation"
import { checkAuth } from "../../middleware/checkAuth"
import { Role } from "../user/user.interface"

const router=Router()

router.post("/create-ride",validateRequest(rideCreateZodSchema),checkAuth(Role.RIDER),rideController.createRide)
router.delete("/delete-ride/:id",checkAuth(Role.RIDER),rideController.deleteRide)
router.get("/all-ride",checkAuth(Role.RIDER),rideController.getAllRide)
router.get("/all-ride-admin",checkAuth(Role.ADMIN),rideController.getAllRideAdmin)

export const  RideRouters=router