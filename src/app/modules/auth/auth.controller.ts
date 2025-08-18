import { catchAsync } from "../../utils/catchAsycn";
import { NextFunction, Request, Response } from "express";
import { authservices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import { setAuthCookie } from "../../utils/setCookie";
import { JwtPayload } from "jsonwebtoken";

const creadentialsLogin=catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const loginInfo=await authservices.credentialsLogin(req.body)

    setAuthCookie(res,loginInfo)

    sendResponse(res,{
        success:true,
        statusCode:StatusCodes.OK,
        message:"user Login successfully",
        data:loginInfo
    })
})

const getNewAccessToken=catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
  const refreshToken=req.cookies.refreshToken;
  if(!refreshToken){
    throw new AppError(StatusCodes.BAD_REQUEST,"No token recived from cookies")
  }

  const tokenInfo=await authservices.getNewAccessToken(refreshToken)

    setAuthCookie(res,tokenInfo)

     sendResponse(res, {
        success: true,
        statusCode: StatusCodes.ACCEPTED,
        message: "New access token retrived  Successfully",
        data: tokenInfo,
    })
})

const logout=catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
  
    res.clearCookie("accessToken",{
        httpOnly:true,
        secure:false,
        sameSite:"lax"
    })

    res.clearCookie("refreshToken",{
        httpOnly:true,
        secure:false,
        sameSite:"lax"
    })

     sendResponse(res, {
        success: true,
        statusCode: StatusCodes.ACCEPTED,
        message: "User logout   Successfully",
        data: null,
    })
})

const changePassword=catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
  
    const decodedToken=req.user;
    
    const {oldPassword,newPassword}=req.body

    const user=await authservices.changePassword(decodedToken ,oldPassword,newPassword) 

     sendResponse(res, {
        success: true,
        statusCode: StatusCodes.ACCEPTED,
        message: "Password change Successfully",
        data: null,
    })
})

export const authContoller={
    creadentialsLogin,
    getNewAccessToken,
    logout,
    changePassword
}