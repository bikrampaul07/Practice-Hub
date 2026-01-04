import express from "express";
import cors from "cors";
import path from "path";
import { serve } from "inngest/express";
import { Env } from "./src/lib/Env.js";
import { connectDb } from "./src/lib/Db.js";
import { inngest, functions } from "./src/lib/Inngest.js";
import ChatRoutes from "./src/routes/ChatRoutes.js"
import { clerkMiddleware } from "@clerk/express";

const app = express();
const __dirname = path.resolve();

/* ---------- MIDDLEWARE ---------- */
app.use(express.json());

app.use(
  cors({
    origin: Env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(clerkMiddleware()) // this will add auth field to give access
/* ---------- INNGEST ---------- */
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chats",ChatRoutes)

/* ---------- STATIC FILES ---------- */
if (Env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../Frontend/dist/index.html")
    );
  });
}

/* ---------- ROUTES ---------- */
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Success" });
});

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "Health is good" });
});

/* ---------- SERVER ---------- */
const PORT = Env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(` App is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(" Server startup error:", error);
    process.exit(1);
  }
};

startServer();
