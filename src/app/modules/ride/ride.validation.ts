import z from "zod"
import { IVehicle } from "../user/user.interface"
import { IPaymentStatus, IStatus } from "./ride.interface"

export const rideCreateZodSchema=z.object({
    rider:z.string().optional(),
    driver:z.string().optional(),
    vehicle:z
            .enum(Object.values(IVehicle) as [string])
            .optional(),
    pickUpLocation: z.object({
  lat: z.number(),
  lng: z.number(),
  address: z.string().optional()
}),
    dropOffLocation: z.object({
  lat: z.number(),
  lng: z.number(),
  address: z.string().optional()
}),
    status:z
            .enum(Object.values(IStatus) as [string])
            .optional(),
    paymentStatus:z
            .enum(Object.values(IPaymentStatus) as [string])
            .optional(),
    rideCost:z.number().optional(),
    distance:z.string().optional(),

})