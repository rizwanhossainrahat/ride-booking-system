
import { IRide } from "./ride.interface"
import { Ride } from "./ride.model"
import AppError from "../../error/AppError"
import { StatusCodes } from "http-status-codes"
import { JwtPayload } from "jsonwebtoken"
import { calculateDistance } from "../../utils/calculateDistance"
import { Role } from "../user/user.interface"
import { Payment } from "../payment/payment.model"
import { getTransactionId } from "../../utils/getTransectionId"
import { sslService } from "../sslCommerz/sslCommerz.service"
import { ISSLCommerz } from "../sslCommerz/sslCommerz.interface"
import { User } from "../user/user.model"

const createRide=async(payload:IRide,decodedToken:JwtPayload)=>{
    const riderId=decodedToken.userId
    const isUserExist=await User.findById(riderId)
    if(!isUserExist){
        throw new AppError(StatusCodes.BAD_REQUEST,"user does not exist")
    }
    const {email,name,phone}=isUserExist
    const transactionId=getTransactionId()

    const session=await Ride.startSession()
    session.startTransaction()

    try {
        const {pickUpLocation,dropOffLocation}=payload
      if (!decodedToken) {
        throw new AppError(StatusCodes.UNAUTHORIZED, 'Your are unauthorized');
    }

    if (decodedToken.isBlocked) {
        throw new AppError(StatusCodes.FORBIDDEN, 'Your account is blocked');
    }

    if (decodedToken.role !== Role.RIDER) {
        throw new AppError(StatusCodes.FORBIDDEN, 'Only riders can create rides');
    }

    const distanceCalculate = calculateDistance(
        pickUpLocation.lat,
        pickUpLocation.lng,
        dropOffLocation.lat,
        dropOffLocation.lng
    );

    const distance = `${distanceCalculate.toFixed(2)}km`;
    const rideCost = Math.ceil(distanceCalculate * 20);

    const rideData={...payload,rider:riderId,
        distance,
        rideCost}

     const rideArray=await Ride.create( [rideData],{session})

     const ride=rideArray[0]

     const paymentData={
        ride:ride._id ,
        rider:riderId,
        amount:rideCost,
        transactionId:transactionId
        }
     const payment=await Payment.create( [paymentData],{session})

     const sslPayload:ISSLCommerz={
        amount:rideCost,
        email:email,
        name:name,
        phoneNumber:phone,
        transactionId:transactionId,
        
     }

     const sslPayment=await sslService.sslPaymentInit(sslPayload)

        await session.commitTransaction(); 
        session.endSession()
        
      return {
        paymentUrl:sslPayment.GatewayPageURL,
        ride:rideArray,
        payment:payment
      }
    } catch (error) {
        await session.abortTransaction(); 
        session.endSession()
        throw error
    }
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