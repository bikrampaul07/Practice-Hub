import { Router } from "express";
import { creatSession,getActiveSession,getRecentSession,getSessionById,joinSession,endSession } from "../controller/SessionController.js";
import {clerkAuth} from "../middleware/ClerkMiddleware.js"
const router=Router()
router.post("/",clerkAuth,creatSession)
router.get("/active-session",clerkAuth,getActiveSession)
router.get("/recent-session",clerkAuth,getRecentSession)
router.get("/:Id",clerkAuth,getSessionById)
router.get("/:Id/join-session",clerkAuth,joinSession)
router.get("/:Id/end-session",clerkAuth,endSession)

export default router