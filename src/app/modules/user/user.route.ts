import { Router } from "express";
import { userController } from "./user.controller";
import zodValidateHandler from "../../middleware/zodValidateHandler";
import { createUserZodSchema } from "./user.validation";


const router = Router()

router.post('/', zodValidateHandler(createUserZodSchema), userController.createUser)
router.get('/', userController.getUsers)



export { router as userRouter };