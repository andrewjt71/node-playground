import getProjectedValue from "./propertyValueCalculator"
import Property from "../../models/property";

/**
 * Filter an array of properties on a minimum projected value in a specified number of years
 *
 * @param properties Array of properties to filter.
 * @param minimum projected value.
 * @param number of years to project.
 */
export default function filterMinValueProjection(properties: Array<Property>, minumumProjectedValue: number, projectedYears: number){
    return properties.filter(property => {
        if (!property.previous_valuation || ! property.previous_valuation_date) {return false;}

        const result: number = getProjectedValue(
            property.previous_valuation,
            property.previous_valuation_date,
            new Date(),
            +projectedYears,
            property.area_value_factor);

        return result > (+minumumProjectedValue);
    });
}
