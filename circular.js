/*
var assert = require('assert')
function rotate (width, move, n) {
    assert(move <= width, 'move must be less than or equal to width')
    var mask = (0xffffffff << 32 - width >>> 32 - width)
    return (n << move & mask) | (n >>> width - move)
}
*/

function bitwiseRotateLeft (x, n, m) { // :: Int -> Int -> Int

    var mask = (0xffffffff >>> 32 - m /*<< 32 - m*/)
    var a = (n & mask).toString(2)
    var b = (x >> n & mask).toString(2)
    var c = (x << m - n).toString(2) //the 0 is appended here
    var d = ((x >> n & mask) | (x << m - n)).toString(2)

console.log(x.toString(2) + '\t' +  mask + "\t" + a + '\t' + b + '\t' + c + '\t' + d)
   // return (x >> n & mask) | (x << m - n)
}


// Rotates the significant bits of x to the left by n. ''
function bitwiseRotateRight (x, n, m) { // :: Int -> Int -> Int

    var mask = (0xffffffff << 32 - m >>> 32 - m)
    var a = (n & mask).toString(2)
    var b = (x << n & mask).toString(2)
    var c = (x >>> m - n).toString(2)
    var d = ((x << n & mask) | (x >>> m - n)).toString(2)

console.log(x.toString(2) + '\t' + mask + "\t" + a + '\t' + b + '\t' + c + '\t' + d)

}

console.log("Bit Rotate Right")
console.log("a = (n & mask)")
console.log("b = (x << n & mask)")
console.log("c = (x >>> m - n)")
console.log("n = 2")
console.log("m = 3")
console.log("d = ((x << n & mask) | (x >>> m - n))\n")
console.log("x"+ '\t' + 'mask' + "\t" + 'a' + '\t' + 'b' + '\t' + 'c' + '\t' + 'd')
bitwiseRotateRight(1,2,3)
bitwiseRotateRight(2,2,3)
bitwiseRotateRight(3,2,3)
bitwiseRotateRight(4,2,3)
bitwiseRotateRight(5,2,3)
bitwiseRotateRight(6,2,3)
bitwiseRotateRight(7,2,3)

console.log("")

console.log("Bit Rotate left")
console.log("a = (n & mask)")
console.log("b = (x >> n & mask)")
console.log("c = (x << m - n)")
console.log("d = (x >> n & mask) | (x << m - n)")
console.log("n = 2")
console.log("m = 3")
console.log("")

console.log('x' + '\t' + 'mask' + "\t" + 'a' + '\t' + 'b' + '\t' + 'c' + '\t' + 'd')
bitwiseRotateLeft(1,2,3)
bitwiseRotateLeft(2,2,3)
bitwiseRotateLeft(3,2,3)
bitwiseRotateLeft(4,2,3)
bitwiseRotateLeft(5,2,3)
bitwiseRotateLeft(6,2,3)
bitwiseRotateLeft(7,2,3)
