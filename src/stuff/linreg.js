/**
 * Simple linear regression
 *
 * @param {Array.<number>} data
 * @return {Function}
 */
export default function regression(data, len, offset) {

    data = data.slice(0, len).reverse().map((x, i) => [i, x])

    var sum_x = 0,
        sum_y = 0,
        sum_xy = 0,
        sum_xx = 0,
        count = 0,
        m, b

    // calculate sums
    for (var i = 0, len = data.length; i < len; i++) {
        if (!data[i]) return NaN
        var point = data[i]
        sum_x += point[0]
        sum_y += point[1]
        sum_xx += point[0] * point[0]
        sum_xy += point[0] * point[1]
        count++
    }

    // calculate slope (m) and y-intercept (b) for f(x) = m * x + b
    m = (count * sum_xy - sum_x * sum_y) / (count * sum_xx - sum_x * sum_x)
    b = (sum_y / count) - (m * sum_x) / count

    return m * (data.length - 1 - offset) + b

}

/**
 * Simple linear regression median line
 *
 * @param {Array.<number>} data
 * // slope, y-intercept, standard deviation
 * @return {Number, Number, Number}
 */
export function regressionMedLine(data) {
    var sum_x = 0,
        sum_y = 0,
        sum_xy = 0,
        sum_xx = 0,
        count = 0,
        m,
        b,
        // $1,
        // $2,
        stdDev

    // calculate sums directly without mapping
    for (var i = 0, len = data.length; i < len; i++) {
        if (data[i] === undefined) return NaN // adjusted to check for undefined explicitly
        sum_x += i
        sum_y += data[i]
        sum_xx += i * i
        sum_xy += i * data[i]
        count++
    }

    // calculate slope (m) and y-intercept (b) for f(x) = m * x + b
    m = (count * sum_xy - sum_x * sum_y) / (count * sum_xx - sum_x * sum_x)
    b = (sum_y - m * sum_x) / count

    // Calculate predictions and residuals
    var residuals = []
    for (var i = 0; i < data.length; i++) {
        if (data[i] !== undefined) {
            // Ensuring we only deal with defined values
            var predicted = m * i + b
            var residual = data[i] - predicted
            residuals.push(residual * residual) // Squaring the residual
        }
    }

    // Then calculate standard deviation of residuals
    var sumOfSquaredResiduals = residuals.reduce((acc, curr) => acc + curr, 0)
    var variance = sumOfSquaredResiduals / (residuals.length - 2) // Adjusted to use residuals.length
    stdDev = Math.sqrt(variance)

    // // Calculate and return median line end points
    // $1 = m * 0 + b // for the first point
    // $2 = m * (data.length - 1) + b // for the last point
    // could be interesting to return a third point for the extension? Might be less work / more elegant to do that here
    return { m, b, stdDev }
}
