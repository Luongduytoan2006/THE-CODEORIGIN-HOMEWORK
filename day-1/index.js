const a = 1
const b = true
const c = 'hello'
const d = null
const e = undefined

const x = {
    a: 1,
    b: true,
    c: 'hello',
    d: null,
    e: undefined
}

const y = x

y.a++

console.log(x.a)
console.log(y.a)
