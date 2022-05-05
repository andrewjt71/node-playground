import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.collections";

export const propertiesRouter = express.Router();

propertiesRouter.use(express.json());

/**
 * Retrieve all properties.
 */
propertiesRouter.get("/", async (_req: Request, res: Response) => {
    try {
        // Call find with an empty filter object, meaning it returns all documents in the collection. Saves as property array to take advantage of types
        const properties = await collections.properties.find({}).toArray();

        res.status(200).send(properties);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

/**
 * Retrieve property by ID.
 */
propertiesRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const property = await collections.properties.findOne(query);

        if (property) {
            res.status(200).send(property);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

/**
 * Create new property.
 */
propertiesRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newProperty = req.body;
        const result = await collections.properties.insertOne(newProperty);

        result
            ? res.status(201).send(`Successfully created a new property with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new property.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

/**
 * Update property.
 */
propertiesRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedProperty = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await collections.properties.updateOne(query, { $set: updatedProperty });

        result
            ? res.status(200).send(`Successfully updated property with id ${id}`)
            : res.status(304).send(`Property with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

/**
 * Delete property.
 */
propertiesRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.properties.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed property with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove property with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Property with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
