var gray = require('gray-code')

/*
    input for gray code ranking:
    n = number of bits
    mu = a mask in B^n
    pi = a pattern in B^n such that (pi & mu) = 0 <- should be able to get this
    based on the mask.
    i = a value in a set of points.
*/

// this was for the number. It may be unnecessary.
function bitArray (number) { // :: int -> arr
    var bits = []
    var binaryString = number.toString(2).split("")

    for (var i = 0; i < binaryString.length; i++) {
        bits[i] = parseInt(binaryString[i], 10)
    }

    return bits
}



// get bit length from the mask.
function mask (string) { // :: str -> arr
    var mu = []
    var muString = string.split("")

    for (var i = 0; i < muString.length; i++) {
         mu[i] = parseInt(muString[i], 10)
    }
   return mu
}
