import { chatClient, streamClient } from "../lib/Stream.js";
import Session from "../models/Session.js";

export const creatSession = async (req, res) => {
  try {
    const { problem, difficulty } = req.body;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;
    if (!problem || !difficulty)
      return res
        .status(400)
        .json({ msg: "Problem and Difficulty are required" });

    const callId = `session_${Date.now()}_${Math.random()
      .toString(36)
      .substring(7)}`;
    const session = await Session.create({
      problem,
      difficulty,
      host: userId,
      callId,
    });

    await streamClient.video.call("default", callId).getOrCreate({
      data: {
        created_by_id: clerkId,
        custom: { problem, difficulty, sessionId: session._id.toString() },
      },
    });
    const channel = chatClient.channel("messaging", callId, {
      name: `${problem}`,
      created_by_id: clerkId,
      members: [clerkId],
    });
    await channel.create();

    return res.status(200).json({
      msg: "Successfully created video call and chat session",
      session,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal Error",
      error,
    });
  }
};

export const getActiveSession = async (req, res) => {
  try {
    const sessions = await Session.findOne("active")
      .populate("host", "name clerkId mail")
      .sort({ createdAt: -1 })
      .limit(20);

    return res.status(200).json({ sessions });
  } catch (error) {
    console.log("Active sessions not found");
    return res.status(500).json({
      msg: "Internal Error",
      error,
    });
  }
};

export const getRecentSession = async (req, res) => {
  try {
    const userId = req.user._id;
    const session = await Session.find({
      status: "completed",
      $or: [{ host: userId }, { perticipant: userId }],
    })
      .sort({ createdAt: -1 })
      .limit(20);

    return res.status(200).json({ session });
  } catch (error) {
    console.log("Recent sessions not found");
    return res.status(500).json({
      msg: "Internal Error",
      error,
    });
  }
};

export const getSessionById = async (req, res) => {
  try {
    const sessionId = req.params;
    const session = await Session.findById(sessionId)
      .populate("host", "name email profileImage")
      .populate("perticipant", "name email profileImage");
    return res.status(200).json({ session });
  } catch (error) {
    console.log("SessionId not found");
    return res.status(500).json({
      msg: "Internal Error",
      error,
    });
  }
};
export const joinSession = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    const session = await Session.findById(id);
    if (!session) return res.status(400).json({ msg: "session not found" });
    if (session.status !== "active") {
      return res.status(400).json({
        msg: "we can not join a completed session",
      });
    }
    if (session.host.toString() === userId.toString()) {
      return res.status(400).json({
        msg: "host can not join a session as participant",
      });
    }
    if (session.perticipant)
      return res.status(409).json({
        msg: "Session is full",
      });
    session.participant = userId;
    await session.save();
    const channel = chatClient.channel("messaging", session.callId);
    await channel.addMembers([clerkId]);
    return res.status(200).json({
      session,
    });
  } catch (error) {
    console.log("Error in joining a session");
    return res.status(500).json({
      msg: "Internal server Error",
      error,
    });
  }
};

export const endSession = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const session = await Session.findById(id);
    if (!session) return res.status(400).json("session not found");
    if(session.host.toString() != userId.toString()) {
        res.status(400).json({
            msg:"Only host can end the session"
        })
    }
    if(session.status === "completed") return res.status(400).json({
        msg:"You can not end a completed session"
    })
    const call = streamClient.video.call("default",session.callId)
    await call.delete({hard:true})

    const channel = chatClient.channel("messaging",session.callId)
    await channel.delete()
    session.status="completed"
    await session.save()

    return res.status(200).json({session})
  } catch (error) {
    console.log("Error while ending a session");
    return res.status(500).json({
      msg: "Internal server Error",
      error,
    });
  }
};
