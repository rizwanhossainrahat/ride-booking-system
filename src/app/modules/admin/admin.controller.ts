import { StatusCodes } from "http-status-codes"
import { catchAsync } from "../../utils/catchAsycn"
import { sendResponse } from "../../utils/sendResponse"
import { NextFunction, Request, Response } from "express";
import { AdminServices } from "./admin.service";


const getAllRider=catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
  
const result=await AdminServices.getAllRider()
    sendResponse(res,{
        success:true,
        statusCode:StatusCodes.OK,
        message:"Rider data retrive",
        data:result,
    })
})

const getAllDriver=catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
  
const result=await AdminServices.getAllDriver()
    sendResponse(res,{
        success:true,
        statusCode:StatusCodes.OK,
        message:"Driver data retrive",
        data:result,
    })
})

const deleteRider=catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
  const riderId=req.params.id
const result=await AdminServices.deleteRider(riderId as string)
    sendResponse(res,{
        success:true,
        statusCode:StatusCodes.OK,
        message:"rider deleted successfully",
        data:"",
    })
})

const deleteDriver=catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
  const riderId=req.params.id
const result=await AdminServices.deleteDriver(riderId as string)
    sendResponse(res,{
        success:true,
        statusCode:StatusCodes.OK,
        message:"driver deleted successfully",
        data:"",
    })
})



export const AdminAContorller={
    getAllRider,
    getAllDriver,
    deleteRider,
    deleteDriver
}