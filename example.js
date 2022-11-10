
if (JSON === undefined) { JSON = {} }
JSON.prune = require('./JSON.prune.js')

function foo() {}
foo.itself = foo
foo.number = 42
foo.indirect = [foo]

function replacer(value, defaultString, isCyclic, options) {
    if (!isCyclic && typeof value === 'function') {
        const entries = Object.entries(value)
        if (entries.length <= 0) {
            return defaultString
        } else {
            options.depthDecr += 1
            return `Function${ JSON.prune(entries, options) }`
        }
    } else {
        return defaultString
    }
}

console.log(JSON.prune(foo))
console.log(JSON.prune(foo, { replacer: replacer }))
console.log(JSON.prune({ _1: { _2: { _3: foo } } }, { depthDecr: 1, replacer: replacer }))
console.log(JSON.prune({ _1: { _2: { _3: foo } } }, { depthDecr: 2, replacer: replacer }))
console.log(JSON.prune({ _1: { _2: { _3: foo } } }, { depthDecr: 3, replacer: replacer }))
console.log(JSON.prune({ _1: { _2: { _3: foo } } }, { depthDecr: 4, replacer: replacer }))
console.log(JSON.prune({ _1: { _2: { _3: foo } } }, { depthDecr: 5, replacer: replacer }))
console.log(JSON.prune({ _1: { _2: { _3: foo } } }, { depthDecr: 6, replacer: replacer }))
