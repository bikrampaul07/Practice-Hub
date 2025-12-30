import express from "express";
import { Env } from "./src/lib/Env.js";
import { connectDb } from "./src/lib/Db.js";
import cors from "cors";
import path from "path"


const app = express();

const __dirname = path.resolve()


if(Env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname,"../Frontend/dist")))

    // app.get("/{*any}",(req,res)=>{
    //     res.sendFile(path.join(__dirname,"../Frontend/dist/index.html"))
    // })
}

app.use(
  cors({
    origin: Env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Success",
  });
});

app.get("/health",(req,res)=>{
    res.status(200).json({
        msg:"Health is good"
    })
})

let port = Env.Port;

const server = async () => {
  try {
    await connectDb();
    app.listen(port, () => {
      console.log(`App is listening at post ${port}`);
    });
  } catch {
    console.error("there is an error in server");
  }
};
server();
