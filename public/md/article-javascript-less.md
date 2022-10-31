

##import、export（default）

```
// module.js
export let thing = 'init'
setTimeout(() => {
  thing = 'changed'
}, 500)

// main.js
import { thing as importThing } from './module.js'
const module = await import('./module.js')
let { thing } = await import('./module.js')
setTimeout(() => {
  console.log(importThing) // 'changed'
  console.log(module.thing) // 'changed'
  console.log(thing) // 'init'
}, 1000)
```

​		import导入是实时的，或者理解为引用，当使用结构赋值时，当前值已经分配给了新的标识符。

```
// module.js
let thing = 'init'
export { thing }
export default thing
setTimeout(() => {
  thing = 'changed'
}, 500)

// main.js
import { thing, default as defaultThing } from './module.js'
import anotherDefault from './module.js'
setTimeout(() => {
  console.log(thing) // 'changed'
  console.log(defaultThing) // 'init'
  console.log(anotherDefault) // 'init'
}, 1000)
```

​		export default后面的被视为一个表达式，导致thing按值传递，就好像在导出之前被分配给了一个隐藏变量，所以thing在计时器中被分配一个新值时，更改不会被反映到实际到处的隐藏变量中。

```
// module.js
let thing = 'init'
export { default as thing }
setTimeout(() => {
  thing = 'changed'
}, 500)
// main.js
import defaultThing from './module.js'
import { default as thing } from './module.js'
setTimeout(() => {
  console.log(defaultThing) // 'changed'
  console.log(thing) // 'changed'
}, 1000)
```

​		export {}无法直接导出值，所以export { default as thing }始终导出的是一个引用。

```
// module.js
export default function thing() {}
setTimeout(() => {
  thing = 'change'
}, 500)
// main.js
import thing from './module.js'
setTimeout(() => {
  console.log(thing) // 'changed'
}, 1000)
```

​		export default function thing()是个特例，他会按引用传递。

```
// module.js
import { main } from './main.js'
main()
export function module() {}
// main.js
import { module } from './module.js'
module()
export function main() {}
```

​		这样是有效的，这是因为函数的提升，把两个函数定义高于了调用

## Array.isArray

```
const noProtoArr = []
Object.setProtoTypeOf(noProtoArr, null)
if(Array.isArray(noProtoArr)) {
  noProtoArr.map(...) // Error!!!
}
console.log(Array.isArray(noProtoArr)) // true
console.log(noProtoArr.map) // undefined
```

​		如果需要避免这种特殊情况可以使用：

```javascript
Array.protoType.map.call(noProtoArr, callback)
```

##函数参数默认值

```
function mixArgs(first, second) {
    console.log(arguments.length) // 1
    console.log(first === arguments[0]) // true
    console.log(second === arguments[1]) // true
    first = "c"
    second = "d"
    console.log(first === arguments[0]) // true
    console.log(second === arguments[1]) // false
}
mixArgs("a")
```

分析：1、只传入了一个参数，arguments.length为1

​			2、arguments[0]为传入的a，first参数为a，相等。

​			3、arguments[1]为undefined，second为undefinded，相等。

 		   4、非严格模式，参数变化影响arguments对象，first与arguments都为c，相等。

​			5、arguments[1]还是undefined，second为”d“，不相等。

```
function mixArgs(first, second = 'b') {
    console.log(arguments.length) // 1
    console.log(first === arguments[0]) // true
    console.log(second === arguments[1]) // false
    first = "c"
    second = "d"
    console.log(first === arguments[0]) // false
    console.log(second === arguments[1]) // false
}
mixArgs("a")
```

分析：1、只传入了一个参数，arguments.length为1

​			2、arguments[0]为传入的a，first参数为a，相等。

​			3、arguments[1]为undefined，second为”b“，不相等。

​			4、参数默认值触发arguments与具名参数分离，arguments[0]不变，first为”c“，不相等。

​			5、second为”d“，arguments[1]为undefined，不相等。