import { chatClient } from "../lib/Stream.js"
export const streamToken =async (req,res)=>{
try {
    const token = await chatClient.createToken(req.user.clerkId);
    return res.status(200).json({
        token,
        name:req.user.name,
        clerkId:req.user.clerkId,
        profileImage:req.user.image
    })
} catch (error) {
    console.error("error in stream-controller",error.message)
    res.status(500).json({
        msg:"Internal server error"
    })
}
}