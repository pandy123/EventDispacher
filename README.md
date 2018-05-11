# EventDispacher
This is a package for event emitting.
# how to use
```js
var eventEmitter = require('eventdispacher')
var test = new eventEmitter.EventDispacher()
var con = function(event) {
        console.log(event.name)
    }
    /**只添加一次回调 */
test.once(this, 'once', con)
test.dispach('once', { name: 'once' })
test.dispach('once', { name: 'once' })

var add1 = function(event) {
    console.log(event.name)
}
test.addListener(this, 'add', add1)
var add2 = function(event) {
        console.log(event.name)
    }
    /**只添加一次回调 */
test.addListener(this, 'add', add2)
test.dispach('add', { name: 'add' })

test.removeListener('add', add1)
test.dispach('add', { name: 'add' })
test.clear()
test.dispach('add', { name: 'add' })
```
