import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes"
import AppError from "../error/AppError";
import { envVars } from "../config/env";
import { TErrorSources } from "../interface/error.types";
import { handlerZodError } from "../helpers/handlerZodError";
import { handlerValidationError } from "../helpers/handlerValidationError";
import { handleCastError } from "../helpers/handleCastError";
import { handlerDuplicateError } from "../helpers/handleDuplicateError";



export const globalErrorHandler=(err:any,req: Request, res: Response, next: NextFunction)=>{
  
    let errorSources:TErrorSources[]=[]
    let statusCode = 500
    let message = "Something Went Wrong!!"
   
    console.log(err.name)

    
    // Zod error
     if (err.name === "ZodError") {
        const simplifiedError = handlerZodError(err)
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
        errorSources = simplifiedError.errorSources as TErrorSources[]
    }

     //validation error
    else  if(err.name==="ValidationError"){
        const simplifiedError = handlerValidationError(err)
        statusCode = simplifiedError.statusCode;
        errorSources = simplifiedError.errorSources as TErrorSources[]
        message = simplifiedError.message

    }
    //cast error
   else if(err.name==="CastError"){
        const simplifiedError = handleCastError(err)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message
    }
 //duplicate error
   else if(err.code===11000){
        const simplifiedError=handlerDuplicateError(err)
        statusCode=simplifiedError.statusCode,
        message=simplifiedError.message
    }
   else if(err instanceof AppError){
        statusCode=err.statusCode
        message=err.message
    }else if(err instanceof Error){
         statusCode=500,
        message=err.message
    }


    res.status(statusCode).json({
        success:false,
        // message:err.message || message,
        message,
        errorSources,
        err: envVars.NODE_ENV === "development" ? err : null,
        stack: envVars.NODE_ENV === "development" ? err.stack : null
    })
}
