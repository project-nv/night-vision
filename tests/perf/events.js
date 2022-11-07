
import events from '../../src/core/events.js'


events.on('component1:event-type-1', () => {})

console.time('General event')

for (var i = 0; i < 10000000; i++) {

    events.emit('event-type-1', {a: 1})

}

console.timeEnd('General event')


console.time('Component event')

for (var i = 0; i < 10000000; i++) {

    events.emitSpec('component1', 'event-type-1', {a: 1})

}

console.timeEnd('Component event')
