
const SECOND = 1000
const MINUTE = SECOND * 60
const MINUTE3 = MINUTE * 3
const MINUTE5 = MINUTE * 5
const MINUTE15 = MINUTE * 15
const MINUTE30 = MINUTE * 30
const HOUR = MINUTE * 60
const HOUR4 = HOUR * 4
const HOUR12 = HOUR * 12
const DAY = HOUR * 24
const WEEK = DAY * 7
const MONTH = WEEK * 4
const YEAR = DAY * 365

const MONTHMAP = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun","Jul", "Aug",
    "Sep", "Oct","Nov", "Dec"
]

// Grid time steps
const TIMESCALES = [
    YEAR * 10, YEAR * 5, YEAR * 3, YEAR * 2, YEAR,
    MONTH * 6, MONTH * 4, MONTH * 3, MONTH * 2, MONTH,
    DAY * 15, DAY * 10, DAY * 7, DAY * 5, DAY * 3, DAY * 2, DAY,
    HOUR * 12, HOUR * 6, HOUR * 3, HOUR * 1.5, HOUR,
    MINUTE30, MINUTE15, MINUTE * 10, MINUTE5, MINUTE * 2, MINUTE
]

// Grid $ steps
const $SCALES = [0.05, 0.1, 0.2, 0.25, 0.5, 0.8, 1, 2, 5]

// Default colors
const COLORS = {
    back: '#14151c', // Background color
    grid: '#252732', // Grid color
    text: '#adadad', // Regular text color
    textHL: '#dedddd', // Highlighted text color
    textLG: '#c4c4c4', // Legend text color
    llValue: '#818989', // Legend value color
    llBack: '#14151c77', // Legend bar background
    llSelect: '#2d7b2f', // Legend select border
    scale: '#606060', // Scale edge color
    cross: '#8091a0', // Crosshair color
    candleUp: '#41a376', // "Green" candle color
    candleDw: '#de4646', // "Red" candle color
    wickUp: '#23a77688', // "Green" wick color
    wickDw: '#e5415088', // "Red" wick color
    volUp: '#41a37682', // "Green" volume color
    volDw: '#de464682', // "Red" volume color
    panel: '#2a2f38', // Scale panel color
    tbBack: undefined, // Toolbar background
    tbBorder: '#8282827d' // Toolbar border color
}

const ChartConfig = {
    SBMIN: 60,       // Minimal sidebar, px
    SBMAX: Infinity, // Max sidebar, px
    TOOLBAR: 57,     // Toolbar width, px
    TB_ICON: 25,     // Toolbar icon size, px
    TB_ITEM_M: 6,    // Toolbar item margin, px
    TB_ICON_BRI: 1,  // Toolbar icon brightness
    TB_ICON_HOLD: 420,// Wait to expand, ms
    TB_BORDER: 1,    // Toolbar border, px
    TB_B_STYLE: 'dotted', // Toolbar border style
    TOOL_COLL: 7,    // Tool collision threshold
    PIN_RADIUS: 5.5, // Tool pin radius
    EXPAND: 0.15,    // Expand y-range, %/100 of range
    CANDLEW: 0.7,    // Candle width, %/100 of step
    GRIDX: 100,      // Grid x-step target, px
    GRIDY: 47,       // Grid y-step target, px
    BOTBAR: 28,      // Bottom bar height, px
    PANHEIGHT: 22,   // Scale panel height, px
    DEFAULT_LEN: 50, // Starting range, candles
    MINIMUM_LEN: 5,  // Minimal starting range, candles
    MIN_ZOOM: 5,     // Minimal zoom, candles
    MAX_ZOOM: 5000,  // Maximal zoom, candles,
    VOLSCALE: 0.15,  // Volume bars height, %/100 of layout.height
    UX_OPACITY: 0.9, // Ux background opacity
    ZOOM_MODE: 'tv', // Zoom mode, 'tv' or 'tl'
    L_BTN_SIZE: 21,  // Legend Button size, px
    L_BTN_MARGIN: '-6px 0 -6px 0', // css margin
    SCROLL_WHEEL: 'prevent', // Scroll wheel morde, 'prevent', 'pass', 'click',
    QUANTIZE_AFTER: 0, // Quantize cursor after, ms
    AUTO_PRE_SAMPLE: 10, // Sample size for auto-precision
    CANDLE_TIME: true // Show remaining candle time 
}

ChartConfig.FONT =
    `11px -apple-system,BlinkMacSystemFont,
    Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,
    Fira Sans,Droid Sans,Helvetica Neue,
    sans-serif`

const IB_TF_WARN =
    `When using IB mode you should specify ` +
    `timeframe ('tf' filed in 'chart' object),` +
    `otherwise you can get an unexpected behaviour`

const MAP_UNIT = {
  "1s": SECOND,
  "5s": SECOND * 5,
  "10s": SECOND * 10,
  "20s": SECOND * 20,
  "30s": SECOND * 30,
  "1m": MINUTE,
  "3m": MINUTE3,
  "5m": MINUTE5,
  "15m": MINUTE15,
  "30m": MINUTE30,
  "1H": HOUR,
  "2H": HOUR * 2,
  "3H": HOUR * 3,
  "4H": HOUR4,
  "12H": HOUR12,
  "1D": DAY,
  "1W": WEEK,
  "1M": MONTH,
  "1Y": YEAR,
  // Lower case variants
  "1h": HOUR,
  "2h": HOUR * 2,
  "3h": HOUR * 3,
  "4h": HOUR4,
  "12h": HOUR12,
  "1d": DAY,
  "1w": WEEK,
  "1y": YEAR
}

// Half-pixel adjustment to the canvas
const HPX = - 0.5

export default {
    SECOND: SECOND,
    MINUTE: MINUTE,
    MINUTE5: MINUTE5,
    MINUTE15: MINUTE15,
    MINUTE30: MINUTE30,
    HOUR: HOUR,
    HOUR4: HOUR4,
    DAY: DAY,
    WEEK: WEEK,
    MONTH: MONTH,
    YEAR: YEAR,
    MONTHMAP: MONTHMAP,
    TIMESCALES: TIMESCALES,
    $SCALES: $SCALES,
    ChartConfig: ChartConfig,
    MAP_UNIT: MAP_UNIT,
    IB_TF_WARN,
    COLORS,
    HPX
}
