import { Request, Response } from "express";
import * as propertiesFilter from "../services/properties/propertiesFilter";
import * as propertyRepository from "../repository/propertyRepository";

/**
 * Controller action responsible for retrieving a property.
 *
 * @param req Request.
 * @param res Response.
 */
export async function getPropertyAction(req: Request, res: Response) {
    const id = req?.params?.id;

    try {
        const property = await propertyRepository.findById(id);

        if (property) {
            res.status(200).send(property);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
}

/**
 * Controller action responsible for retrieving properties.
 *
 * @param req Request.
 * @param res Response.
 */
export async function getPropertiesAction(req: Request, res: Response) {
    
    try {
        // Convert to property array to take advantage of types.
        const properties = await propertyRepository.findAll()
        const minumumProjectedValue = req.query.minumumProjectedValue;
        const projectedYears = req.query.projectedYears;

        if (( ! minumumProjectedValue  || !projectedYears)) {
            res.status(200).send(properties);
            return;
        }

        res.status(200).send(propertiesFilter.filterMinValueProjection(properties, +minumumProjectedValue, +projectedYears));
    } catch (error) {
        res.status(500).send(error.message);
    }
}

/**
 * Controller action responsible for creating a property.
 *
 * @param req Request.
 * @param res Response.
 */
export async function createPropertyAction(req: Request, res: Response) {
    try {
        const newProperty = req.body;
        const result = await propertyRepository.insert(newProperty);

        result
            ? res.status(201).send(`Successfully created a new property with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new property.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}

/**
 * Controller action responsible for updating a property.
 *
 * @param req Request.
 * @param res Response.
 */
export async function updatePropertyAction(req: Request, res: Response) {
    const id = req?.params?.id;

    try {
        const updatedProperty = req.body;
        const result = await propertyRepository.update(id, updatedProperty);

        result
            ? res.status(200).send(`Successfully updated property with id ${id}`)
            : res.status(304).send(`Property with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
}

/**
 * Controller action responsible for deleting a property.
 *
 * @param req Request.
 * @param res Response.
 */
export async function deletePropertyAction(req: Request, res: Response) {
    const id = req?.params?.id;

    try {
        const result = await propertyRepository.remove(id);

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
}
