import { Types } from "mongoose";

export enum IPaymentState{
  PENDING = "PENDING",       
  SUCCESS = "SUCCESS",      
  FAILED ="FAILED",         
  CANCELLED = "CANCELLED",   
  REFUNDED ="REFUNDED" 
}

export interface IPayment{
    _id?:Types.ObjectId,
    ride:Types.ObjectId,
    driver?:Types.ObjectId,
    rider:Types.ObjectId,
    amount:Number,
    transactionId:String
    paymentState?:IPaymentState
}