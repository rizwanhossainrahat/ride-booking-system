import z from "zod"
import { IVehicle } from "../user/user.interface"
import { IPaymentStatus, IStatus } from "./ride.interface"

export const rideCreateZodSchema=z.object({
    rider:z.string().optional(),
    driver:z.string().optional(),
    vehicle:z
            .enum(Object.values(IVehicle) as [string])
            .optional(),
    pickUpLocation:z.string().min(1, "pickUpLocation is required"),
    dropOffLocation:z.string().min(1, "pickUpLocation is required"),
    status:z
            .enum(Object.values(IStatus) as [string])
            .optional(),
    paymentStatus:z
            .enum(Object.values(IPaymentStatus) as [string])
            .optional(),
})