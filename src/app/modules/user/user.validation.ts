import z from "zod";
import { IsActive, Role } from "./user.interface";

export const creatUserZodSchema=z.object({
    name:z.
   string({error:"Name must be string"})
   .min(2,{message:"Name Too short minimum 2 character long"})
   .max(50,{message:"Name cannot exceed 50 character"}),

   email:z
    .string({error:"email must be string"})
    .email("Invalid email format").toLowerCase()
    .min(5,{message:"invalid email address format"})
     .max(100,{message:"Name cannot exceed 100 character"}),

   password:z
    .string({error:"password must be string"})
    .min(8,{message:"Password must be 8 character long"})
     .regex(/^(?=.*[A-Z])/, {
            message: "Password must contain at least 1 uppercase letter.",
        })
    .regex(/^(?=.*[!@#$%^&*])/, {
           message: "Password must contain at least 1 special character.",
        })
     .regex(/^(?=.*\d)/, {
            message: "Password must contain at least 1 number.",
        }),

      phone: z
        .string({ error: "Phone Number must be string" })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
            message: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
        })
        .optional(),
             address: z
        .string({ error: "Address must be string" })
        .max(200, { message: "Address cannot exceed 200 characters." })
        .optional(),  
        
    role:z.enum(Role).optional(),
    
})

export const UserUpdateZodSchema=z.object({
     name: z
        .string({ error: "Name must be string" })
        .min(2, { message: "Name must be at least 2 characters long." })
        .max(50, { message: "Name cannot exceed 50 characters." }).optional(),
    password: z
        .string({ error: "Password must be string" })
        .min(8, { message: "Password must be at least 8 characters long." })
        .regex(/^(?=.*[A-Z])/, {
            message: "Password must contain at least 1 uppercase letter.",
        })
        .regex(/^(?=.*[!@#$%^&*])/, {
            message: "Password must contain at least 1 special character.",
        })
        .regex(/^(?=.*\d)/, {
            message: "Password must contain at least 1 number.",
        }).optional(),
    phone: z
        .string({ error: "Phone Number must be string" })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
            message: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
        })
        .optional(),
    role: z
        .enum(Object.values(Role) as [string])
        .optional(),
    isActive: z
        .enum(Object.values(IsActive) as [string])
        .optional(),
    isVerified: z
        .boolean({ error: "isVerified must be true or false" })
        .optional(),
})

