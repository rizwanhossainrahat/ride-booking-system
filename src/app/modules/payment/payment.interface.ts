import { Types } from "mongoose";

export enum IPaymentState{
  PENDING = "PENDING",       
  PAID = "PAID",      
  FAILED ="FAILED",         
  CANCELLED = "CANCELLED",   
  REFUNDED ="REFUNDED" 
}

export interface IPayment{
    _id?:Types.ObjectId,
    ride?:Types.ObjectId,
    driver?:Types.ObjectId,
    rider:Types.ObjectId,
    amount:number,
    transactionId:string
    paymentState?:IPaymentState
}