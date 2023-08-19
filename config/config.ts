import * as dotenv from "dotenv";
dotenv.config();

export const config = () => {
    if(process.env.NODE_ENV === "development"){
        return {
            host: process.env.DB_DEV_HOST,
            user: process.env.DB_DEV_USER,
            password: process.env.DB_DEV_PASSWORD,
            database: process.env.DB_DEV_NAME,
            secret: process.env.SECRET_KEY,
            port: process.env.PORT
        }
    }
    if(process.env.NODE_ENV === "production"){
        return {
            host: process.env.DB_PROD_HOST,
            user: process.env.DB_PROD_USER,
            password: process.env.DB_PROD_PASSWORD,
            database: process.env.DB_PROD_NAME,
            secret: process.env.SECRET_KEY,
            port: process.env.PORT
        }
    }
};