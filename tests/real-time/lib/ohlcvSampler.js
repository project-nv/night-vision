// Make new candles from trade stream

export default function sample(ohlcv, trade, tf = 60000) {
    let last = ohlcv[ohlcv.length - 1];
    if (!last) return;
    let tick = trade["price"];
    let volume = trade["volume"] || 0;
    let tNext = last[0] + tf;
    let tn = new Date().getTime();

    let t = tn >= tNext ? tn - (tn % tf) : last[0];

    if (t >= tNext && tick !== undefined) {
        // And new zero-height candle
        let nc = [t, tick, tick, tick, tick, volume];
        //callback('candle-close', symbol)
        ohlcv.push(nc);
        return true; // Make update('range')
    } else if (tick !== undefined) {
        // Update an existing one
        last[2] = Math.max(tick, last[2]);
        last[3] = Math.min(tick, last[3]);
        last[4] = tick;
        last[5] += volume;
        return false; // Make regular('update')
    }
}
