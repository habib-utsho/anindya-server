import { Router } from "express";

const router = Router();

router.post('/', (req, res) =>
    res.send('Profile route is working')
)
router.get('/', (req, res) =>
    res.send('Profile route is working')
)

export const profileRoute = router;