import dotenv from "dotenv"
dotenv.config()


export const Env = {
    Port:process.env.PORT,
    Db_Url:process.env.DB_URL
}