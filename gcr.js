/*
    n = number of bits
    mu = a mask in B^n
    pi = a pattern in B^n such that (pi & mu) = 0 <- should be able to get this
    based on the mask.
    i = a value in a set of points.
*/

function bitArray (number) {
    var bits = []
    var binaryString = number.toString(2).split("")
    for (var i = 0; i < binaryString.length; i++) {
        bits[i] = parseInt(binaryString[i], 10)
    }
    return bits
}
