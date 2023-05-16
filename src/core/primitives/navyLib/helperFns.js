
// Collection of math function for overlay-API

// Fast simple-moving-average calculation
// without a buffer (using a virual "buffer")
export function fastSma(data, di, i0, iN, length) {
    let acc = 0 // Accumulator
    let out = [] // Output time-series
    let counter = 0 // How many elements are in the "buffer"
    let mult = 1 / length

    // Starting with i0 - length position
    let start = Math.max(i0 - length, 0)
    for (var i = start; i <= iN; i++) {
        acc += data[i][di]
        counter++

        // If there is an overflow, remove the first
        // element from the "buffer"
        if (counter > length) {
            acc -= data[i - length][di]
            counter--
        }

        // When the "buffer" hit target length,
        // start to add values to the output TS
        if (counter === length) {
            out.push([data[i][0], acc * mult])
        }
    }
    return out

}

// Return candle color depending on the direction
export function candleColor(props, candle = []) {
    if (candle[4] >= candle[1]) {
        return props.colorBodyUp
    } else {
        return props.colorBodyDw
    }
}

// TODO: work with colors & opacity


export function rescaleFont(fontString, newSize) {
    let pair = fontString.split('px')
    return newSize + 'px' + pair[1]
}