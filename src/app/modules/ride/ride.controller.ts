import { catchAsync } from "../../utils/catchAsycn";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { rideServices } from "./ride.service";
import { JwtPayload } from "jsonwebtoken";

const createRide=catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const verifiedToken=req.user
    
    const ride=await rideServices.createRide(req.body,verifiedToken)
   
    sendResponse(res,{
        success:true,
        statusCode:StatusCodes.CREATED,
        message:"Ride created successfully",
        data:ride
    })
})

const deleteRide=catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const rideId=req.params.id
    const verifiedToken=req.user
    const deleteRide=await rideServices.deleteRide(rideId,verifiedToken)

    sendResponse(res,{
        success:true,
        statusCode:StatusCodes.OK,
        message:"Ride deleted successfully",
        data:null
    })
})

const getAllRide=catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const verifiedToken=req.user
    const allRide=await rideServices.getAllRide(verifiedToken)

    sendResponse(res,{
        success:true,
        statusCode:StatusCodes.OK,
        message:"All retrived  successfully",
        data:allRide 
    })
})

const getAllRideAdmin=catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    
    const allRide=await rideServices.getAllRideAdmin()

    sendResponse(res,{
        success:true,
        statusCode:StatusCodes.OK,
        message:"All retrived  successfully",
        data:allRide 
    })
})


export const rideController={
    createRide,
    deleteRide,
    getAllRide,
    getAllRideAdmin,
} 