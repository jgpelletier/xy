var gray = require('gray-code')

/*
    input for gray code ranking:
/*
    input for gray code ranking:s
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

// it may not be possible to derive the pattern from the
// mask. It may need to be given.
function pattern (mask) { // :: arr -> arr
    var pi = []
    var maskNum = mask.join("")
    var i = 1
    var piString = i.toString(2).split('')

    maskNum = parseInt(maskNum, 2)
    var x = maskNum & i

    // need to enter the loop
    while ( x != 0) { // && (piString.length != mask.length)) {
        i++
        piString = i.toString(2).split('')
        //console.log(piString)

    }

    for (var j = 0; j < piString.length; j++) {
        pi[j] = parseInt(piString[j], 10)
    }

    return pi
    /*
    if ((maskNum & i) == 0) {
        piString = i.toString(2).split('')
        if (piString.length == mask.length) {
            for (var j = 0; j < piString.length; j++) {
                pi[j] = parseInt(piString[j], 10)
            }
        return pi
    } else {
        while ((maskNum & i) != 0) {
             i++
        }

        piString = i.toString(2).split('')

        }
    }
    for (var i = 0; i < mask.length; i++ ) {
        pi[i] = 0
        if ((pi[i] & mask[i]) == 0) pi[i] = 0
        else pi[i] = 1
    }
    */
}

function main (string) {
    var mu = mask(string)
    var pi = pattern(mu)
    return pi
    //return mu
}

console.log(main('010110'))

function bitArray (number) {
    var bits = []
    var binaryString = number.toString(2).split("")
    for (var i = 0; i < binaryString.length; i++) {
        bits[i] = parseInt(binaryString[i], 10)
    }
    return bits
}
