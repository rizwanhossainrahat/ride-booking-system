import { Types } from "mongoose";

export enum Role{
    ADMIN="ADMIN",
    RIDER="RIDER",
    DRIVER="DRIVER"
}

export enum IVehicle{
    BIKE="BIKE",
    CAR="CAR",
    SCOOTER="SCOOTER"
}

export enum IsActive{
    ACTIVE="ACTIVE",
    INACTIVE="INACTIVE",
    BLOCKED="BLOCKED"
}

export interface IAddress{
 street?: string,    
  city?:string;
}

export interface IUser{
    _id?:Types.ObjectId
    name:string,
    email:string,
    password?:string,
    phone?:string,
    role?:Role,
    isVerified?: boolean,
    isActive?:IsActive,
    currentLocation?: IAddress,
    destination?:IAddress,
    vehicle?: {
    type: IVehicle,
    number: string; 
   };

}