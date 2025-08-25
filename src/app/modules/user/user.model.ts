import { model, Schema } from "mongoose";
import { DriverStatus, IsActive, IUser, IVehicle, Role } from "./user.interface";

const userSchema=new Schema<IUser>({
    name:{type:String,required:true,trim:true},
    email:{type:String,required:true,unique:true},
    password:{type:String},
    phone:{type:Number},
    role:{
        type:String,
        enum:Object.values(Role),
        default:Role.RIDER,
    },
    isVerified:{type:Boolean},
    isActive:{
        type:String,
        enum:Object.values(IsActive),
        default:IsActive.ACTIVE
    },
    vehicle:{
        type:String,
        enum:Object.values(IVehicle),
    }, 
    licenseNumber:{
        type:String
    },
    vehicleNumber:{
        type:String
    },
    driverStatus:{
        type:String,
        enum:Object.values(DriverStatus),
        default:DriverStatus.ACTIVE
    },
    rating:{
        type:Number,
    }
},{
    versionKey:false,
    timestamps:true
})

export const User=model<IUser>("User",userSchema)