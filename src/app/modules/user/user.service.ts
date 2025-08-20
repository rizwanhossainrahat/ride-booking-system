import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import { IUser, Role } from "./user.interface"
import { User } from "./user.model"
import bcryptjs from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";

const createUser=async(payload:Partial<IUser>)=>{
    const {email,password,...rest}=payload;
    const isUserExist=await User.findOne({email})
   if(isUserExist){
    throw new AppError(StatusCodes.BAD_REQUEST,"User already exists")
   }

   const hashedPassword=await bcryptjs.hash(password as string, 10)

   if (!payload.vehicle) {
    if (payload.role === Role.DRIVER ) {
        throw new AppError(401, "Driver must be submit vehicle type")
    }
}
   if (!payload.licenseNumber) {
    if (payload.role === Role.DRIVER) {
        throw new AppError(401, "Driver must be submit license Number ")
    }
}
   if (!payload.vehicleNumber) {
    if (payload.role === Role.DRIVER) {
        throw new AppError(401, "Driver must be submit vehicle number")
    }
}

  

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

const updateUser=async(userId:string,payload:Partial<IUser>,decodedToken:JwtPayload)=>{

   if(payload.role){
    if(decodedToken.role===Role.RIDER || decodedToken.role===Role.DRIVER){
         throw new AppError(StatusCodes.FORBIDDEN, "You are not authorized");
    }
   }
    if(decodedToken.role===Role.ADMIN){
          throw new AppError(StatusCodes.FORBIDDEN, "You are not authorized");
    }

       if (payload.isActive || payload.isVerified) {
        if (decodedToken.role === Role.RIDER || decodedToken.role === Role.DRIVER) {
            throw new AppError(StatusCodes.FORBIDDEN, "You are not authorized");
        }
    }

     if (payload.password) {
        payload.password = await bcryptjs.hash(payload.password,10)
    }

  const newUpdatedUser=await User.findByIdAndUpdate(userId,payload,{new:true,runValidators:true})



  return newUpdatedUser
}  

const getSingleUser=async(decodedToken:JwtPayload)=>{
    const user=await User.findById(decodedToken.userId)
    return{
        user
    }
}   

export const userServices={
    createUser,
    getAllUser,
    updateUser,
    getSingleUser
    
}