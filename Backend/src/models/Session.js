import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
problem:{
    type:String,
    required:true
},
host:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
},
difficulty:{
    type:String,
    enum:["easy","moderate","hard"]
}
,
perticipant:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    default:null
},
status:{
    type:String,
    enum:["active","completed"],
    default:"active"
},
callId:{
    type:String,
    default:""
}
},{timestamps:true})

const Session=mongoose.model("Session",sessionSchema);
export default Session