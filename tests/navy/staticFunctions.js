
// NavyScript syntax test (parse static functions)

import fs from 'fs'
import Parser from '../../src/core/navy/parser.js'

const src = fs.readFileSync('./tests/navy/scripts/candles_static.navy', 'utf-8')

const parser = new Parser(src)
