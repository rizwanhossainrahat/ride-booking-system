import { Router } from "express";
import { userController } from "./user.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "./user.interface";
import { validateRequest } from "../../middleware/validateRequest";
import { creatUserZodSchema, UserUpdateZodSchema } from "./user.validation";



const router=Router();

router.post("/register",
    validateRequest(creatUserZodSchema),
userController.createUser)

router.get("/",checkAuth(Role.ADMIN),userController.getAllUser)

router.get("/me",checkAuth(...Object.values(Role)),userController.getSingleUser)

router.patch("/:id",validateRequest(UserUpdateZodSchema),checkAuth(...Object.values(Role)),userController.updateUser)

export const UserRouters=router