import { Router } from "express";
import { UserRouters } from "../app/modules/user/user.route";
import { AuthRouter } from "../app/modules/auth/auth.route";
import { RideRouters } from "../app/modules/ride/ride.route";
import { DriverRoutes } from "../app/modules/driver/driver.route";
import { PaymentRoutes } from "../app/modules/payment/payment.route";
import { AdminRouters } from "../app/modules/admin/admin.routes";


export const router=Router()

 const moduleRouter=[
    {
        path:"/user",
        route:UserRouters,
    },
    {
        path:"/auth",
        route:AuthRouter,
    },
    {
        path:"/ride",
        route:RideRouters,
    },
    {
        path:"/driver",
        route:DriverRoutes,
    },
    {
        path:"/payment",
        route:PaymentRoutes,
    },
    {
        path:"/admin",
        route:AdminRouters,
    }
 ]

 moduleRouter.forEach((route)=>{
    router.use(route.path,route.route)
})