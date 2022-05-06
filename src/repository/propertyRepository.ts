import Property from "../entity/property";
import { collections } from "../services/database/collections";
import {DeleteResult, InsertOneResult, ObjectId, UpdateResult } from "mongodb";

/**
 * Find all products.
 */
export async function findAll(): Promise<Array<Property>> {
    // Convert to property array to take advantage of types.
    return await collections.properties.find({}).toArray();
}

/**
 * Find property by ID.
 *
 * @param id
 */
export async function findById(id:string): Promise<Property> {
    return await collections.properties.findOne({ _id: new ObjectId(id) });
}

/**
 * Insert property.
 *
 * @param newProperty
 */
export async function insert(newProperty:Property): Promise<InsertOneResult> {
    return await collections.properties.insertOne(newProperty);
}

/**
 * Update property.
 *
 * @param id
 * @param updatedProperty
 */
export async function update(id:string, updatedProperty:Property): Promise<UpdateResult> {
    return await collections.properties.updateOne({_id:new ObjectId(id)}, { $set: updatedProperty });
}

/**
 * Remove property by ID.
 *
 * @param id
 */
export async function remove(id:string): Promise<DeleteResult> {
    const query = { _id: new ObjectId(id) };
    return await collections.properties.deleteOne(query);
}
