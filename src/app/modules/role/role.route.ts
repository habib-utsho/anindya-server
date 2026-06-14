import { Router } from "express";
import { roleController } from "./role.controller";


const router = Router()

router.post('/', roleController.createRole)
router.get('/', roleController.getRoles)



export { router as roleRouter };