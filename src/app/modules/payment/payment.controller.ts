import { catchAsync } from "../../utils/catchAsycn";
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { paymentService } from "./payment.service";

const initPayment=catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const payment=await paymentService.initPayment() 

    sendResponse(res,{
        success:true,
        statusCode:StatusCodes.CREATED,
        message:"Payment created successfully",
        data:""
    })
})

export const paymentController={
    initPayment
}