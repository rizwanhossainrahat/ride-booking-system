import { model, Schema } from "mongoose";
import { IPaymentStatus, IRide, IStatus } from "./ride.interface";
import { IVehicle } from "../user/user.interface";


const rideSchema=new Schema<IRide>({
    rider:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    driver:{
        type:Schema.Types.ObjectId,
        ref:"Driver",
    },
    vehicle:{
        type:String,
        enum:Object.values(IVehicle),
        default:IVehicle.BIKE
    },
    pickUpLocation:{type:String,required:true},
    dropOffLocation:{type:String,required:true},
    status:{
        type:String,
        enum:Object.values(IStatus),
        default:IStatus.PENDING
    },
    paymentStatus:{
        type:String,
        enum:Object.values(IPaymentStatus),
        default:IPaymentStatus.UNPAID
    }
},{
    versionKey:false,
    timestamps:true
})

export const Ride=model<IRide>("Ride",rideSchema)