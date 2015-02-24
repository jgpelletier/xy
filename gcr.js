/*

    input for gray code rankings:
    n = number of bits
    mu = a mask in B^n
    pi = a pattern in B^n such that (pi & mu) = 0 <-- not used.
    i = a value in a set of points.

*/

function bitArray (number) { // :: int -> arr
    var bits = []
    var binaryString = number.toString(2).split("")

    for (var i = 0; i < binaryString.length; i++) {
        bits[i] = parseInt(binaryString[i], 10)
    }

    return bits
}

function mask (string) { // :: str -> arr
    var mu = []
    var muString = string.split("")

    for (var i = 0; i < muString.length; i++) {
         mu[i] = parseInt(muString[i], 10)
    }
   return mu
}

function gcr (precision, string, number) {
    var i = bitArray(number)
    var mu = mask(string)
    var r = 0
    var k = 0
    while (i.length < precision) {
        i = [0].concat(i)
    }

    while (k < precision) {

        if (mu[k] == 1) {
           r = (r << 1) | i[k]
        }
        k++
    }

    return r
}
