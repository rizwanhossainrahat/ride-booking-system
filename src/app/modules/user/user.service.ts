import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import { IUser } from "./user.interface"
import { User } from "./user.model"


const createUser=async(payload:Partial<IUser>)=>{
    const email=payload.email;
    const isUserExist=await User.findOne({email})
   if(isUserExist){
    throw new AppError(StatusCodes.BAD_REQUEST,"User already exists")
   }
    const user=await User.create({
        name:payload.name,
        email:payload.email
    })
    return user
}   

export const userServices={
    createUser
}