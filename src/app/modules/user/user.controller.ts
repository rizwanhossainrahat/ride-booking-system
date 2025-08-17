import { NextFunction, request, Request, response, Response } from "express";
import { userServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsycn";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";


const createUser=catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
     const user=await userServices.createUser(req.body)
    
   sendResponse(res,{
    success:true,
    statusCode:StatusCodes.CREATED,
    message:"user created successfully",
    data:user
   })
})


export const userController={
    createUser
}