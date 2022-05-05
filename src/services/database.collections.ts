import * as mongoDB from "mongodb";
import Property from "../models/property";

export const collections: { properties?: mongoDB.Collection<Property> } = {};
