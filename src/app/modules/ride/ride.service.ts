
import { IRide } from "./ride.interface"
import { Ride } from "./ride.model"
import AppError from "../../error/AppError"
import { StatusCodes } from "http-status-codes"
import { JwtPayload } from "jsonwebtoken"


const createRide=async(payload:IRide,decodedToken:JwtPayload)=>{
    const riderId=decodedToken.userId
      
     const ride=await Ride.create({
        ...payload,
        rider:riderId
     })

      return ride
}

const deleteRide=async(rideId:string,decodedToken:JwtPayload)=>{
    const isRideExits=await Ride.findById(rideId)

      if(!isRideExits){
        throw new AppError(StatusCodes.BAD_REQUEST,"Ride not found")
     }

     if(decodedToken.userId!==isRideExits.rider?.toString()){
        throw new AppError(StatusCodes.BAD_REQUEST,"You can't delete this ride")
     }

      const ride=await Ride.findByIdAndDelete(rideId)
          return ride
}

const getAllRide=async(decodedToken:JwtPayload)=>{
    const ride=await Ride.find({rider:decodedToken.userId})
  
    if(!ride){
        throw new AppError(StatusCodes.BAD_REQUEST,"You don't take any ride")
    }

    return ride 

}

const getAllRideAdmin=async()=>{
    const ride=await Ride.find({})
  
    if(!ride){
        throw new AppError(StatusCodes.BAD_REQUEST,"You don't take any ride")
    }

    return ride 

}



export const rideServices={
    createRide,
    deleteRide,
    getAllRide,
    getAllRideAdmin
}