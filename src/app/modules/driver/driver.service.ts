import { StatusCodes } from "http-status-codes"
import AppError from "../../error/AppError"
import { Ride } from "../ride/ride.model"
import { IStatus } from "../ride/ride.interface"
import { JwtPayload } from "jsonwebtoken"
import { User } from "../user/user.model"
import { DriverStatus } from "../user/user.interface"

const acceptRide=async(rideId:string,decodedToken:JwtPayload)=>{
    const ride=await Ride.findById(rideId)
    const driverId=decodedToken.userId
    const isDriverExists=await User.findById(driverId)
    if(!ride){
        throw new AppError(StatusCodes.BAD_REQUEST,"This ride is not exits")
    }
    if(!isDriverExists){
        throw new AppError(StatusCodes.BAD_REQUEST,"This driver is not exits")
    }

   const riderDetails=await User.findById(ride.rider) 
    if(!riderDetails){
        throw new AppError(StatusCodes.BAD_REQUEST,"This rider is not exits")
    }
   ride.status=IStatus.ONGOING,
   ride.driver=isDriverExists._id,
   isDriverExists.driverStatus=DriverStatus.ONRIDE

   const {password:pass,...driver}=isDriverExists.toObject()
   const {password,...rider}=riderDetails?.toObject()

   ride.save()
   isDriverExists.save()

   riderDetails.save()

   return {
       ride,
       rider
   }
    
}


const rejectRide=async(rideId:string,decodedToken:JwtPayload)=>{
    const ride=await Ride.findById(rideId)
    const driverId=decodedToken.userId
    const isDriverExists=await User.findById(driverId)
    if(!ride){
        throw new AppError(StatusCodes.BAD_REQUEST,"This ride is not exits")
    }
    if(!isDriverExists){
        throw new AppError(StatusCodes.BAD_REQUEST,"This driver is not exits")
    }

   
   ride.status=IStatus.CANCEL,
   ride.driver=isDriverExists._id,

   ride.save()
   isDriverExists.save()


   return {
       ride,
   }
    
}

export const driverServices={
    acceptRide,
    rejectRide
}