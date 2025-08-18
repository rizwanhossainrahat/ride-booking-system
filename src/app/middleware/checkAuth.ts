import { NextFunction, Request, Response } from "express";
import AppError from "../error/AppError";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import { User } from "../modules/user/user.model";
import { verifyToken } from "../utils/jwt";

export const checkAuth=(...role:string[])=>async(req: Request, res: Response, next: NextFunction)=>{

    const token=req.headers.authorization;
    
    if(!token){
        throw new AppError(StatusCodes.BAD_REQUEST,"Authorization header not found")
    }

    const isVerified=verifyToken(token,envVars.JWT_ACCESS_SECRET) as JwtPayload


    const isUserExist=await User.findOne({email:isVerified.email})

    if(!isUserExist){
         throw new AppError(StatusCodes.BAD_REQUEST,"User Not Found")
   }

   if(!role.includes(isVerified.role)){
    throw new AppError(401, "You can't access this route");
   }
   
   req.user=isVerified

   next()
}