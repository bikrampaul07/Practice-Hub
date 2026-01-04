
import { clerkAuth } from "../middleware/ClerkMiddleware.js"
import  { streamToken } from "../controller/StreamToken.js"
import { Router } from "express"

const router=Router()
router.get("/stream",clerkAuth,streamToken)

export default router