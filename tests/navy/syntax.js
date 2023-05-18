
// NavyScript syntax test

import fs from 'fs'
import Parser from '../../src/core/navy/parser.js'

const src = fs.readFileSync('./tests/navy/scripts/base_overlay.navy', 'utf-8')

const parser = new Parser(src)
