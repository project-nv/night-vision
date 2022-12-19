class DataLoader {
    constructor() {
        this.URL = "https://api1.binance.com/api/v3/klines";
        this.SYM = "BTCUSDT";
        this.TF = "1m"; // See binance api definitions

        this.loading = false;
    }

    async load(callback) {
        let url = `${this.URL}?symbol=${this.SYM}&interval=${this.TF}`;
        let result = await fetch(url);
        let data = await result.json();
        callback({
            panes: [{
                overlays: [{
                    name: "BTC Tether US Binance",
                    type: "Candles",
                    data: data.map((x) => this.format(x))
                }],
                scripts: [{
                    type: 'EMA',
                    props: { length: 200 }
                }, {
                    type: 'BB'
                }]
            }, {
                scripts: [{
                    type: 'MACD'
                }]
            }, {
                scripts: [{
                    type: 'Stoch'
                }]
            }]
        });
    }

    async loadMore(endTime, callback) {
        if (this.loading) return;
        this.loading = true;
        let url = `${this.URL}?symbol=${this.SYM}&interval=${this.TF}`;
        url += `&endTime=${endTime}`;
        let result = await fetch(url);
        let data = await result.json();
        callback(data.map((x) => this.format(x)));
        this.loading = false;
    }

    format(x) {
        return [
            x[0],
            parseFloat(x[1]),
            parseFloat(x[2]),
            parseFloat(x[3]),
            parseFloat(x[4]),
            parseFloat(x[7])
        ];
    }
}

export { DataLoader };
