import { model, Schema } from "mongoose";
import { IPaymentStatus, IRide, IStatus } from "./ride.interface";
import { IVehicle } from "../user/user.interface";
import { calculateDistance } from "../../utils/calculateDistance";

const LocationSchema = new Schema(
  {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    address: { type: String },
  },
  { _id: false } 
);

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
    pickUpLocation:{type:LocationSchema,required:true},
    dropOffLocation:{type:LocationSchema,required:true},
    status:{
        type:String,
        enum:Object.values(IStatus),
        default:IStatus.PENDING
    },
    paymentStatus:{
        type:String,
        enum:Object.values(IPaymentStatus),
        default:IPaymentStatus.UNPAID
    },
    rideCost:{
        type:Number,
        default:0
    },
    distance:{
        type:String,
    }
},{
    versionKey:false,
    timestamps:true
})

export const Ride=model<IRide>("Ride",rideSchema)

rideSchema.pre('save', function (next) {
    if (!this.isModified('pickupLocation') || !this.isModified('destinationLocation')) {
        return next();
    }

    const pickup = this.pickUpLocation;
    const destination = this.dropOffLocation;

    const distance = calculateDistance(
        pickup.lat,
        pickup.lng,
        destination.lat,
        destination.lng
    );

   
    this.rideCost = Math.ceil(distance * 20);

    next();
});