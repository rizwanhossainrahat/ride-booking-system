import { model, Schema } from "mongoose";
import { IsActive, IUser, Role } from "./user.interface";

const userSchema=new Schema<IUser>({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String},
    phone:{type:String},
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
    currentLocation:{ type:String},
    destination:{ type:String},
    vehicle:{type:String},
    ratings:{type:String}
},{
    versionKey:false,
    timestamps:true
})

export const User=model<IUser>("User",userSchema)