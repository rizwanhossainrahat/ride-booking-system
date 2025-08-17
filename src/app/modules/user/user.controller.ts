import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsycn";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import { authservices } from "../auth/auth.service";


const createUser=catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
     const user=await userServices.createUser(req.body)
    
   sendResponse(res,{
    success:true,
    statusCode:StatusCodes.CREATED,
    message:"user created successfully",
    data:user
   })
})

const getAllUser=catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
   const user=await userServices.getAllUser()
    
   sendResponse(res,{
    success:true,
    statusCode:StatusCodes.CREATED,
    message:"Retrived all user",
    data:user
   })
})




export const userController={
    createUser,
    getAllUser,
    
}