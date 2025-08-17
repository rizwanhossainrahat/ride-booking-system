import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import { IUser } from "./user.interface"
import { User } from "./user.model"
import bcryptjs from "bcryptjs";

const createUser=async(payload:Partial<IUser>)=>{
    const {email,password,...rest}=payload;
    const isUserExist=await User.findOne({email})
   if(isUserExist){
    throw new AppError(StatusCodes.BAD_REQUEST,"User already exists")
   }

   const hashedPassword=await bcryptjs.hash(password as string, 10)

    const user=await User.create({
        email,
        password:hashedPassword,
        ...rest
    })
    return user
}  

 

const getAllUser=async()=>{
    const user=await User.find()
    return{
        user
    }
}   

export const userServices={
    createUser,
    getAllUser,
    
}