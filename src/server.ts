import express from "express";
import { connectToDatabase } from "./services/database.connection";
import { propertiesRouter } from "./routes/properties.router";
import * as dotenv from "dotenv";

// Pull in the .env file so it can be accessed from process.env
dotenv.config();
const app = express();
const port = 8080;

connectToDatabase()
    .then(() => {
        app.use("/properties", propertiesRouter);

        app.listen(process.env.NODE_DOCKER_PORT, () => {
            console.log(`Server started at http://localhost:${process.env.NODE_DOCKER_PORT}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });
