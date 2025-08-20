import { catchAsync } from "../../utils/catchAsycn";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { driverServices } from "./driver.service";

const acceptRide=catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const rideId=req.params.id
    const verifiedToken=req.user;
    
    const acceptRide=await driverServices.acceptRide(rideId,verifiedToken)

    sendResponse(res,{
        success:true,
        statusCode:StatusCodes.ACCEPTED,
        message:"Driver accepted this Ride",
        data:acceptRide
    })
})

const rejectRide=catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const rideId=req.params.id
    const verifiedToken=req.user;
    
    const acceptRide=await driverServices.rejectRide(rideId,verifiedToken)

    sendResponse(res,{
        success:true,
        statusCode:StatusCodes.ACCEPTED,
        message:"Driver rejected this Ride",
        data:acceptRide
    })
})

export const driverController={
    acceptRide,
    rejectRide
}