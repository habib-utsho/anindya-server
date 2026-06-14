import { Router } from "express";
import { userRouter } from "../modules/user/user.route";
import { roleRouter } from "../modules/role/role.route";

const router = Router()

const routes = [
    {
        path: '/user',
        route: userRouter
    },
    {
        path: '/role',
        route: roleRouter
    }
]

routes.forEach(route => router.use(route.path, route.route))

export default router;