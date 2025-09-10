import { StatusCodes } from "http-status-codes"
import AppError from "../../error/AppError"
import { User } from "../user/user.model"

const getAllRider=async()=>{
    const allRider=await User.find({role:"RIDER"})
    const totalRider=await User.countDocuments({role:"RIDER"})
    if(!allRider){
        throw new AppError(StatusCodes.BAD_REQUEST,"There is no Rider ")
    }
    return {
        allRider,
        totalRider
    }
}

const getAllDriver=async()=>{
    const allDriver=await User.find({role:"DRIVER"})
    const totalDriver=await User.countDocuments({role:"DRIVER"})
    if(!allDriver){
        throw new AppError(StatusCodes.BAD_REQUEST,"There is no DRIVER ")
    }
    return {
        allDriver,
        totalDriver
    }
}

const deleteRider=async(riderId :string)=>{
   const rider=await User.findOneAndDelete({_id:riderId ,role:"RIDER"})
    if(!rider){
    throw new AppError(StatusCodes.BAD_REQUEST,"Rider is not found")
   }
    return rider
}

const deleteDriver=async(riderId :string)=>{
   const driver=await User.findOneAndDelete({_id:riderId ,role:"DRIVER"})
   if(!driver){
    throw new AppError(StatusCodes.BAD_REQUEST,"Driver is not found")
   }

    return driver

}

export const AdminServices={
    getAllRider,
    getAllDriver,
    deleteRider,
    deleteDriver
}