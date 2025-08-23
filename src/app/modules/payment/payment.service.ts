import { StatusCodes } from "http-status-codes"
import AppError from "../../error/AppError"
import { IPaymentStatus, IStatus } from "../ride/ride.interface"
import { Ride } from "../ride/ride.model"
import { IPaymentState } from "./payment.interface"
import { Payment } from "./payment.model"

const successPayment=async(query:Record<string, string>)=>{
    const session=await Payment.startSession()
    session.startTransaction()
      try {
        const updatePayment=await Payment.findOneAndUpdate({transactionId:query.transactionId},{paymentState:IPaymentState.PAID},{ new: true, runValidators: true, session })

       

        await Ride.findByIdAndUpdate(updatePayment?.ride,{paymentStatus:IPaymentStatus.PAID},{ new: true, runValidators: true, session })

       await session.commitTransaction(); 
       session.endSession()
        return { success: true, message: "Payment Completed Successfully" }
      } catch (error) {
        await session.abortTransaction(); 
        session.endSession()
        
        throw error
      }
}
const failPayment=async(query:Record<string, string>)=>{
    const session=await Payment.startSession()
    session.startTransaction()
      try {
        const updatePayment=await Payment.findOneAndUpdate({transactionId:query.transactionId},{paymentState:IPaymentState.FAILED},{ new: true, runValidators: true, session })

        await Ride.findByIdAndUpdate(updatePayment?.ride,{paymentStatus:IPaymentStatus.UNPAID},{ new: true, runValidators: true, session })

       await session.commitTransaction(); 
       session.endSession()

        return { success: false, message: "Payment Failed" }
      } catch (error) {
        await session.abortTransaction(); 
        session.endSession()
        throw error
      }
}
const cancelPayment=async(query:Record<string, string>)=>{
    const session=await Payment.startSession()
    session.startTransaction()
      try {
        const updatePayment=await Payment.findOneAndUpdate({transactionId:query.transactionId},{paymentState:IPaymentState.CANCELLED},{ new: true, runValidators: true, session })

        await Ride.findByIdAndUpdate(updatePayment?.ride,{paymentStatus:IPaymentStatus.UNPAID},{ new: true, runValidators: true, session })

       await session.commitTransaction(); 
       session.endSession()

        return { success: false, message: "Payment Failed" }
      } catch (error) {
        await session.abortTransaction(); 
        session.endSession()
        throw error
      }
}


const initPayment=()=>{

}

export const paymentService={
    initPayment,
    successPayment,
    failPayment,
    cancelPayment
}