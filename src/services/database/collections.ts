import * as mongoDB from "mongodb";
import Property from "../../entity/property";

export const collections: { properties?: mongoDB.Collection<Property> } = {};
