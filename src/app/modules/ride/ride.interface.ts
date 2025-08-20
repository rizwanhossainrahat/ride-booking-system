import { Types } from "mongoose";
import { IVehicle } from "../user/user.interface";

export enum IStatus{
    PENDING="PENDING",
    CANCEL="CANCEL",
    ONGOING="ONGOING",
    COMPLETED="COMPLETED"
}

export enum IPaymentStatus{
    UNPAID="UNPAID",
    PAID="PAID"
}

export interface IRide{
    _id:Types.ObjectId,
    rider?:Types.ObjectId,
    driver?:Types.ObjectId,
    vehicle?:IVehicle,
    pickUpLocation:string,
    dropOffLocation:string,
    status?:IStatus,
    paymentStatus?:IPaymentStatus,
}