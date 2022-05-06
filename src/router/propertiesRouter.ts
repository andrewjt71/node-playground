import express, { Request, Response } from "express";
import * as propertyController from "../controller/propertyController";

export const propertiesRouter = express.Router();

propertiesRouter.use(express.json());

/**
 * Get properties Route.
 */
propertiesRouter.get("/", async (req: Request, res: Response) => {
    propertyController.getPropertiesAction(req, res)
});

/**
 * Get property route.
 */
propertiesRouter.get("/:id", async (req: Request, res: Response) => {
    propertyController.getPropertyAction(req, res)
});

/**
 * Create new property route.
 */
propertiesRouter.post("/", async (req: Request, res: Response) => {
    propertyController.createPropertyAction(req, res)
});

/**
 * Update property route.
 */
propertiesRouter.put("/:id", async (req: Request, res: Response) => {
    propertyController.updatePropertyAction(req, res)
});

/**
 * Delete property route.
 */
propertiesRouter.delete("/:id", async (req: Request, res: Response) => {
    propertyController.deletePropertyAction(req, res)
});
