import { Inngest } from "inngest";
import { connectDb} from './Db.js'
import User from '../models/User.js'

export const inngest = new Inngest({ id: "Practice-Hub" });

const syncUser=inngest.createFunction(
    {id:"sync-user"},
    {event:"clerk/user.created"},
    async ({event})=>{
        await connectDb();
        const {id,first_name,last_name,image_url,email_addresses}=event.data;
         const primaryEmail = email_addresses?.find(
      (e) => e.id === primary_email_address_id
    )?.email_address;
        const newUser = {
            clerkId:id,
            name:`${first_name || ""} ${last_name || ""}`,
            email:primaryEmail,
            profileImage:image_url
        }
        await User.create(newUser)

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

        return {success:true}
        
    }
)

export const functions = [syncUser,deleteUser]