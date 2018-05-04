var eventEmitter = require('./build')
var test = new eventEmitter.EventDispacher()
var con = function(event) {
    console.log(event.name)
}
test.once(this, 'dd', con)
test.dispach('dd', { name: 'yes' })
test.dispach('dd', { name: 'yes' })