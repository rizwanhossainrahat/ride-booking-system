import AppError from "../../error/AppError"
import { IUser } from "../user/user.interface"
import { User } from "../user/user.model"
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken"
import { envVars } from "../../config/env";
import { createNewAccessTokenWithRefreshToken, createUserToken } from "../../utils/userToken";

const credentialsLogin=async(payload:Partial<IUser>)=>{
    const {email,password}=payload
    const isUserExist=await User.findOne({email})
    if(!isUserExist){
        throw new AppError(httpStatus.BAD_REQUEST,"Email does not exits")
    }
    const isPasswordMatch=await bcryptjs.compare(password as string,isUserExist.password as string)

    if(!isPasswordMatch){
         throw new AppError(httpStatus.BAD_REQUEST,"Password does not exits")
    }

    const userToken=createUserToken(isUserExist)

   const {password:pass,...rest}=isUserExist.toObject()

   return{
    accessToken:userToken.accessToken,
    refreshToken:userToken.refreshToken,
    user:rest
   }

}

const getNewAccessToken=async(refreshToken:string)=>{
    
   const newAccessToken=await createNewAccessTokenWithRefreshToken(refreshToken)
   return {
    accessToken:newAccessToken
   }
} 

export const authservices={
    credentialsLogin,
    getNewAccessToken
}