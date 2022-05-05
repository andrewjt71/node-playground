import * as mongoDB from "mongodb";
import Property from "../models/property";
import {collections} from "./database.collections"

/**
 * Connect to the database, register / update collections and enforce schema validation.
 */
export async function connectToDatabase() {
    const client = new mongoDB.MongoClient(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`);
    await client.connect();
    const db = client.db(process.env.MONGODB_DATABASE);
    await applySchemaValidation(db);

    // Connect our properties collection with that retrieved from the DB.
    collections.properties = db.collection<Property>('properties');

    console.log(
        `Successfully connected to database: ${db.databaseName} and collection: ${db.collection<Property>('properties').collectionName}`
    );
}

/**
 * Create collection in DB with schema... or update collection with schema if it already exists.
 *
 * https://www.mongodb.com/docs/manual/core/schema-validation/
 * https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
 *
 * @param db
 */
async function applySchemaValidation(db: mongoDB.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "property_number",
                "postcode",
                "room_count",
                "square_footage",
                "inflation_factor",
                "refuse_collection_day",
            ],
            additionalProperties: false,
            properties: {
                _id: {},
                property_number: {
                    bsonType: "number",
                    description: "'property_number' is required and is a number",
                },
                postcode: {
                    bsonType: "string",
                    description: "'postcode' is required and is a string",
                },
                room_count: {
                    bsonType: "number",
                    description: "'room_count' is required and is a number",
                },
                square_footage: {
                    bsonType: "number",
                    description: "'square_footage' is required and is a number",
                },
                inflation_factor: {
                    bsonType: "number",
                    description: "'inflation_factor' is required and is a number",
                },
                refuse_collection_day: {
                    enum: [
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday",
                    ],
                    description: "'refuse_collection_day' is optional and is a string representation of a day of the week",
                },
                previous_valuation: {
                    bsonType: "number",
                    description: "'previous_valuation' is optional and is a number",
                },
                previous_valuation_date: {
                    bsonType: "date",
                    description: "'previous_valuation_date' is optional and is a Date",
                }
            },
        },
    };

    // Update the existing collection's schema. If it doesn't exist, create the collection and apply the schema.
    await db.command({
        collMod: 'properties',
        validator: jsonSchema
    }).catch(async (error: mongoDB.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection('properties', {validator: jsonSchema});
        }
    });
}

/**
 * Helper function for bypassing schema validation. Useful for debugging what's actually being persisted to MongoDB.
 *
 * @param db
 */
async function applyNoSchemaValidation(db: mongoDB.Db) {

    // Try applying the modification to the collection, if the collection doesn't exist, create it
    await db.command({
        collMod: 'properties',
        validator: {},
        validationLevel: "off"
    }).catch(async (error: mongoDB.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection('properties', {validator: {}});
        }
    });
}
