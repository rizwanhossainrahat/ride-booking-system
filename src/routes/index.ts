import { Router } from "express";
import { UserRouters } from "../app/modules/user/user.route";


export const router=Router()

 const moduleRouter=[
    {
        path:"/user",
        route:UserRouters,
    }
 ]

 moduleRouter.forEach((route)=>{
    router.use(route.path,route.route)
})