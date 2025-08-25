import { model, Schema } from "mongoose";
import { IPayment, IPaymentState } from "./payment.interface"

const paymentSchema=new Schema<IPayment>({
   ride: {
      type: Schema.Types.ObjectId,   
      ref: "Ride",                   
      
    },
    driver: {
      type: Schema.Types.ObjectId,   
      ref: "Driver",                   
    },
    rider: {
      type: Schema.Types.ObjectId,   
      ref: "Rider",                   
      required: true,
    },
    amount:{type:Number},
    transactionId:{type:String},
    paymentState:{
      type:String,
      enum:Object.values(IPaymentState),
      default:IPaymentState.PENDING
    }
})

export const Payment=model<IPayment>("Payment",paymentSchema)