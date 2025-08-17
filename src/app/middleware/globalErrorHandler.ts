import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes"

export const globalErrorHandler=(err:any,req: Request, res: Response, next: NextFunction)=>{
   
    let statusCode = 500
    let message = "Something Went Wrong!!"
   
    res.status(statusCode).json({
        success:false,
        message:err.message || message,
        errorDetails:err,
    })
}
