/**
 * Rounds a number to 2dp.
 *
 * @param amount
 */
function roundToNearestPenny(amount: number) {
    const multiplier = Math.pow(10, 2);
    return Math.round(amount * multiplier) / multiplier;
}

/**
 * Calculates a projected value based on the previous valuation, and the years between the previous valuation and
 * the number of years ahead of now the query is for.
 *
 * Disclaimer: This is not a true representation of how this calculation is done, it's just an example using a standard
 * compound interest formula.
 *
 * @param previousValuation The amount the property was previously valued at.
 * @param previousValuationDate The date of the previous valuation.
 * @param currentDate The current date.
 * @param numberOfProjectedYears The number of years into the future the valuation is to be estimated.
 * @param areaValueFactor Used to apply weightings to value increase rates per area/property.
 */
export function getProjectedValue(
    previousValuation: number,
    previousValuationDate: Date,
    currentDate: Date,
    numberOfProjectedYears: number,
    areaValueFactor: number
): number {
    const baseValueIncreaseRatePerYear = 0.11;

    const yearsFromPreviousValuationToProjection = new Date(currentDate.getTime()
        - previousValuationDate.getTime()).getFullYear()
        - 1970
        + numberOfProjectedYears;

    const rateOfGrowth = baseValueIncreaseRatePerYear * areaValueFactor;
    const value = previousValuation * Math.pow((1+rateOfGrowth), yearsFromPreviousValuationToProjection);

    return roundToNearestPenny(value);
}
