import { Router } from "express";
import { createSession,getActiveSessions,getMyRecentSessions,getSessionById,joinSession,endSession } from "../controller/SessionController.js";
import {clerkAuth} from "../middleware/ClerkMiddleware.js"
const router=Router()
router.post("/",clerkAuth,createSession)
router.get("/active",clerkAuth,getActiveSessions)
router.get("/my-recent",clerkAuth,getMyRecentSessions)
router.get("/:id",clerkAuth,getSessionById)
router.post("/:id/join",clerkAuth,joinSession)
router.post("/:id/end",clerkAuth,endSession)

export default router;