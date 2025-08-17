import { Router } from "express";
import { UserRouters } from "../app/modules/user/user.route";
import { AuthRouter } from "../app/modules/auth/auth.route";


export const router=Router()

 const moduleRouter=[
    {
        path:"/user",
        route:UserRouters,
    },
    {
        path:"/auth",
        route:AuthRouter,
    }
 ]

 moduleRouter.forEach((route)=>{
    router.use(route.path,route.route)
})