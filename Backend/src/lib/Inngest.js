import { Inngest } from "inngest";
import { connectDb} from './Db.js'
import User from '../models/User.js'
import {upsertStreamUser,deleteStreamUser} from './Stream.js'

export const inngest = new Inngest({ id: "Practice-Hub" });

const syncUser=inngest.createFunction(
    {id:"sync-user"},
    {event:"clerk/user.created"},
    async ({event})=>{
        await connectDb();
        const {id,first_name,last_name,image_url,email_addresses}=event.data;
       
        const newUser = {
            clerkId:id,
            name:`${first_name || ""} ${last_name || ""}`,
            email:email_addresses[0]?.email_address,
            profileImage:image_url
        }
        await User.create(newUser)

        await upsertStreamUser({
            id:newUser.clerkId.toString(),
            name:newUser.name,
            image:newUser.profileImage
        })

        return {success:true}
    }
)

const deleteUser=inngest.createFunction(
    {id:"delete-user"},
    {event:"clerk/user.deleted"},
    async ({event})=>{
        await connectDb()
        const {id}=event.data;
        await User.findOneAndDelete({clerkId:id})

        await deleteStreamUser(id.toString())
        return {success:true}
        
    }
)

export const functions = [syncUser,deleteUser]