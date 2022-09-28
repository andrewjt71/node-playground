import express from "express";
import { connectToDatabase } from "./services/database/connection";
import { propertiesRouter } from "./router/propertiesRouter";
import * as dotenv from "dotenv";

// Pull in the .env file so it can be accessed from process.env
dotenv.config();
const app = express();

connectToDatabase()
    .then(() => {
        app.use("/properties", propertiesRouter);
            
        app.listen(process.env.NODE_DOCKER_PORT, () => {
            console.log(`Server started on port ${process.env.NODE_DOCKER_PORT}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });
