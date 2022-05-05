import filterMinValueProjection from "./propertiesFilter";
import { ObjectId } from "mongodb";

/**
 * propertyValueCalculator module tests.
 *
 * Expected results were calculated, and checked using an online compound interest calculator
 * e.g. https://www.thecalculatorsite.com/finance/calculators/compoundinterestcalculator.php.
 *
 * @group unit
 */
describe('Property value calculator utility functions', () => {
    test('filterMinValueProjection returns only properties with projected value over the specified amount', async () => {
        const propertyWithHigherProjectedValue = {
            _id: new ObjectId(),
            "property_number": 15,
            "postcode": "CF10 1DD",
            "room_count": 6,
            "square_footage": 127,
            "area_value_factor": 1.1,
            "refuse_collection_day": "Monday",
            "previous_valuation": 125000,
            "previous_valuation_date": new Date()
        }

        const propertyWithLowerProjectedValue = {
            _id: new ObjectId(),
            "property_number": 15,
            "postcode": "CF10 1DD",
            "room_count": 6,
            "square_footage": 127,
            "area_value_factor": 0.9,
            "refuse_collection_day": "Monday",
            "previous_valuation": 125000,
            "previous_valuation_date": new Date()
        }

        const result = filterMinValueProjection([propertyWithHigherProjectedValue, propertyWithLowerProjectedValue], 243589.64, 7);

        expect(result).toContain(propertyWithHigherProjectedValue);
        expect(result).not.toContain(propertyWithLowerProjectedValue);

    })
});
