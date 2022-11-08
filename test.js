
if (JSON === undefined) { JSON = {} }
JSON.prune = require('./JSON.prune.js')

function foo() {}
foo.itself = foo
foo.number = 42
foo.indirect = [foo]

function replacer(value, defaultString, isCyclic, seen) {
    if (!isCyclic && typeof value === 'function') {
        const entries = Object.entries(value)
        if (entries.length <= 0) {
            return defaultString
        } else {
            return `-Function${ JSON.prune(entries, { replacer: replacer, seen: seen }) }-`
        }
    } else {
        return defaultString
    }
}

console.log(JSON.prune(foo))
console.log(JSON.prune(foo, { replacer: replacer }))
