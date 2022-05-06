import * as propertyValueCalculator from "../../services/properties/propertyValueCalculator"

/**
 * propertyValueCalculator module tests.
 *
 * Expected results were calculated, and checked using an online compound interest calculator
 * e.g. https://www.thecalculatorsite.com/finance/calculators/compoundinterestcalculator.php.
 *
 * @group unit
 */
describe('Property value calculator utility functions', () => {
    test('getProjectedValue calculates the expected value after 1 year when area value factor is 1', async () => {
        const valuationDate = new Date('December 17, 2000 03:24:00');
        const todayDate = new Date('December 25, 2001 03:24:00');
        const projectedYears = 0;
        const previousValue = 125000;
        const areaValueFactor = 1;
        const expectedProjectedValue = 138750.00;

        expect(propertyValueCalculator.getProjectedValue(previousValue, valuationDate, todayDate, projectedYears, areaValueFactor)).toEqual(expectedProjectedValue);
    });

    test('getProjectedValue calculates the expected value after 8 years when area value factor is 1 using compound growth rate', async () => {
        const valuationDate = new Date('December 17, 2000 03:24:00');
        const todayDate = new Date('December 25, 2003 03:24:00');
        const projectedYears = 5;
        const previousValue = 125000;
        const areaValueFactor = 1;
        const expectedProjectedValue = 288067.22;

        expect(propertyValueCalculator.getProjectedValue(previousValue, valuationDate, todayDate, projectedYears, areaValueFactor)).toEqual(expectedProjectedValue);
    });

    test('getProjectedValue calculates the expected value over 1 year when area value factor is > 1', async () => {
        const valuationDate = new Date('December 17, 2000 03:24:00');
        const todayDate = new Date('December 25, 2001 03:24:00');
        const projectedYears = 0;
        const previousValue = 125000;
        const areaValueFactor = 1.1;
        const expectedProjectedValue = 140125.00;

        expect(propertyValueCalculator.getProjectedValue(previousValue, valuationDate, todayDate, projectedYears, areaValueFactor)).toEqual(expectedProjectedValue);
    });

    test('getProjectedValue calculates the expected value over 5 years when the area value factor is < 1', async () => {
        const valuationDate = new Date('December 17, 2000 03:24:00');
        const todayDate = new Date('December 25, 2002 03:24:00');
        const projectedYears = 5;
        const previousValue = 125000;
        const areaValueFactor = 0.4;
        const expectedProjectedValue = 168971.52;

        expect(propertyValueCalculator.getProjectedValue(previousValue, valuationDate, todayDate, projectedYears, areaValueFactor)).toEqual(expectedProjectedValue);
    });
});
