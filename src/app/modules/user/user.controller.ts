import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsycn";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

import { JwtPayload } from "jsonwebtoken";


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
    statusCode:StatusCodes.OK,
    message:"Retrived all user",
    data:user
   })
})


const updateUser=catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
  const userId=req.params.id
  const verfiedToken=req.user
 
  const payload=req.body
   const user=await userServices.updateUser(userId,payload,verfiedToken as JwtPayload)
    
   sendResponse(res,{
    success:true,
    statusCode:StatusCodes.CREATED,
    message:"User updated successfully",
    data:user
   })
})

const getSingleUser=catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
  const verfiedToken=req.user;
   const user=await userServices.getSingleUser(verfiedToken as JwtPayload )
    
   sendResponse(res,{
    success:true,
    statusCode:StatusCodes.OK,
    message:"Retrived single user",
    data:user
   })
})

export const userController={
    createUser,
    getAllUser,
    updateUser,
    getSingleUser
    
}