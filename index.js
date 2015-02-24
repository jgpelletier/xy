// Use Hilbert curve point generation to map 2D data to 1D space and vice-versa.
// Will later expand to allow `n` dimensions.

function Point(x, y, z) {
    this.rotations = {
        x: 0,
        y: 0,
        z: 0
    }

    this.init = function (x, y, z) {
        this.x = Math.round(x) || 0
        this.y = Math.round(y) || 0
        if (z != null) {
            this.z = Math.round(z) || 0
            this.d = 3
            this.n = 4 * this.z + 2 * this.y  + this.x
        } else {
            this.z = null
            this.d = 2
        }
    }
    if (x instanceof Array) {
        this.init(x[0], x[1], x[2])
    } else {
        this.init(x, y, z)
    }
}

Point.prototype.rotate = function (p, n) { // :: Point -> Int -> Point
    // record rotations
    if (p.n == 0) return new Point(this.z, this.x, this.y)
    if (p.n == 1 || p.n == 3) return new Point(this.y, this.z, this.x)
    if (p.n == 2 || p.n == 6) return new Point(n - this.x, n - this.y, this.z)
    return new Point(n - this.z, this.x, n - this.y)
}

Point.prototype.rotate2d = function (n, xbit, ybit) { // : Int -> Int -> Int -> Point
    return new Point(rotate2d(n, this.x, this.y, xbit, ybit))
}

Point.prototype.rotate3d = function (level) { // :: Int -> Point
    return new Point(rotate3d(level, this.x, this.y, this.z))
}

Point.prototype.rotateLeft = function (n) { // :: Int -> Point
    if (n % 3 == 0) return this
    if (n % 3 == 1) return new Point(this.y, this.z, this.x)
    return new Point(this.z, this.x, this.y)
}

Point.prototype.rotateRight = function (n) { // :: Int -> Point
    if (n % 3 == 0) return this
    if (n % 3 == 1) return new Point(this.z, this.x, this.y)
    return new Point(this.y, this.z, this.x)
}

Point.prototype.toArray = function () { // :: -> [Int, Int]
        if (this.d == 3) { return [this.x, this.y, this.z] }
        return [this.x, this.y]
}

Point.prototype.mod = function (n) { // :: Int -> Point
    return new Point(this.x % n, this.y % n, this.z % n)
}

Point.prototype.unrotate = function (n) {
    // read this.rotations and undo
}

// Accepts the height or width of a square/graph, and the coordinates to
// convert.
function convert2dPointToDistance (p, height) { // :: Int -> Int -> Int -> Int
    var xbit, ybit, level, d = 0
    var forHeight = p.x > p.y ? p.x : p.y

    // needs some tests to make sure height is compatible
    // What keeps the user from putting 54 down as the height
    while (forHeight >= height) {
            height *=2
    }
    // For each Hilbert level, we want to add an amount to
    // `d` based on which region we are in
    for (level = height / 2; level > 0; level = Math.floor(level / 2)) {
        // Determine what region we're in
        xbit = (p.x & level) > 0
        ybit = (p.y & level) > 0
        // increase distance based on region
        d += level * level * ((3 * xbit) ^ ybit)
        // rotate so that we'll be in sync with the next
        // region.
        p = p.rotate2d(level, xbit, ybit)
        // HEAD
        // p = p.rotate2d(height, xbit, ybit)
    }

    return d
}

// height and coordinates.
function convert3dPointToDistance (p, height) { // :: Int -> Int -> Int -> Int -> Int
    var s = 1, level = 0
    var max = Math.max.apply(Math, p.toArray())
    for (; 2 * s <= max; s *= 2) {
        level = (level + 1) % 3
    }

    // shuffle axes
    // rotate based on parity
}

// Accepts height or width of a square/graph and distance
function convertDistanceTo2dPoint (distance, height) { // :: Int -> Int -> [Int, Int]
    distance = Math.floor(distance)
    var xbit, ybit, level, p = new Point(0, 0)

    if (height <= Math.sqrt(distance))  {
        height = 2
        while (height <= Math.sqrt(distance)) {
            height *=2
        }
    }

    for (level = 1; level < height; level *= 2) {
        xbit = 1 & (distance / 2)
        ybit = 1 & (distance ^ xbit)

        p = p.rotate2d(level, xbit, ybit)
        p.x += level * xbit
        p.y += level * ybit
        distance = Math.floor(distance / 4)
    }

    return p.toArray()
}

// height/width of a square/graph and distance
function convertDistanceTo3dPoint (distance, height) { // Int -> Int -> [Int, Int, Int]
    distance = Math.floor(distance)
    var xbit, ybit, zbit, level, parity
    var iter = 2, log = 0, p = new Point(0, 0, 0)

    height = height || 2

    // vvv this is interesting.
    for (parity = 1; parity < height; parity *= 2, ++log) {}
    parity = log % 3;

    // the `|| distance` was removed from 2d version
    for (level = 1; level < height || distance > 0; level *=2) {
        xbit = distance & 1;
        ybit = (distance / 2) & 1;
        zbit = (distance / 4) & 1;

        var temp = rotate3d(level - 1, xbit ^ ybit, ybit ^ zbit, zbit)
        p.x = temp[0] * level + level - 1
        p.y = temp[1] * level + level - 1
        p.z = temp[2] * level + level - 1

        distance = Math.floor(distance / 8)
        level *= 2;
        iter++;
    }

    return p.rotateLeft(iter - parity + 1).toArray();
}

// Rotate the coordinate plane and (x,y)
function rotate2d (n, x, y, xbit, ybit) { // :: Int -> Int -> Int -> Int -> Int -> [Int, Int]
    if (ybit == 0  ) {
        if (xbit == 1) {
            x = n - 1 - x
            y = n - 1 - y
        }

        var temp = x
        x = y
        y = temp
    }

    return [x, y]
}

// Rotate the coordinate plane and (x,y, z)
function rotate3d(level, x, y, z) { // :: Int -> Int -> Int -> Int -> [Int, Int, Int]
    var index = 4 * z + 2 * y + x
    if (index == 0) {
        return [z, x, y]
    } else if (index == 1 || index == 3) {
        return [y, z, x]
    } else if (index == 2 || index == 6) {
        return [level - x, level - y, z]
    } else if (index == 5 || index == 7) {
        return [y, level - z, level - x]
    } else {
        return [level - z, x, level - y]
    }
}

// returns a non-negative int 'inverse' such that graycode(inverse) = g
function grayInverse (g) { // : Int -> Int
    var m = precision(g), inverse = g, j = 1
    while (j < m) {
        inverse = inverse ^ (g >> j)
        j++
    }
    return inverse
}

// Returns the number of bits required to store an integer
function precision (n) { // :: Int > Int
    var ret = 0
    while (n > 0) {
        ret++
        n = n >> 1
    }
    return ret
}

// Rotates the bits of x to the right by n. no sign preservation.
function bitwiseRotateRight (x, n) { // :: Int -> Int -> Int
    var y = (x >> n) & ~(-1 << (32 - n))
    var z = x << (32 - n)
    return y | z
    /*
    return (x >> n) | (x << (32 - n)) & ~(-1 >> n)
    */
}

// Rotates the bits of x to the left by n. ''
function bitwiseRotateLeft (x, n) { // :: Int -> Int -> Int
    return (x << n) | (x >> (32 - n)) & ~(-1 << n)
    //return (x << n) | (x >> (precision(x) - n)) & ~(-1 << n)
}

function grayTransform (entry, direction, x) { // :: Int -> Int -> Int -> Int
    return bitwiseRotateRight((x ^ entry), direction + 1)
}

function hilbertIndex(dim, point) {
    var index = 0, entry = 0, direction = 0, arr = point.toArray(), code,
        i = precision(Math.max.apply(null, arr)) - 1
    // dim = n
    // precision = m
    // p = point (5,6)
    // vvv this transformation needs to happen
    // entry = e
    // direction = d <- this is n-1. Interesting its set as 0.
    // code = w
    // index = h
    var xBits = []
    var yBits = []

    if (arr[0]) {
        var x = arr[0].toString(2).split("")
        for (var a = 0; a < x.length; a++) {
            xBits[a] = parseInt(x[a], 10)
        }
    }

    if (arr[1]) {
        var y = arr[1].toString(2).split("")
        for (a = 0; a < y.length; a++) {
            yBits[a] = parseInt(y[a], 10)
        }
    }

   // ^^^ Will need z for 3d. There is probably a better way to do this.

    while (i >= 0) {
        var bits = 0

        var l = []
        l = [ yBits.shift(), xBits.shift() ]
        l = l.join('')
        l = parseInt(l, 2)

        // vv look into each of these variables as well as the functions
        // does bits go in as a string?
        bits = grayTransform(entry, direction, l) // transform <- 3, 2, 1
        code = grayInverse(bits) // 2, 3, 1

        // vvv new entry direction and index
        entry = entry ^ bitwiseRotateLeft((entry * code), direction + 1)//0,3,3
        direction = direction + (direction * code) + (1 % dim) //<- 1,0,0
        index = (index << dim) | code // <-2, 11, 45

        i--
    }

    return index // set B subscript M
}

exports.xy2d = function (x, y, height) {
    height = height || 2
    return convert2dPointToDistance(new Point(x, y), height)
}

// This needs to be fixed to not return undefined.
exports.xyz2d = function(x, y, z, height) {
    height = height || 2
    return convert3dPointToDistance(new Point(x, y, z), height)
}
exports.d2xy = convertDistanceTo2dPoint
exports.d2xyz = convertDistanceTo3dPoint
exports.hilbert = function (dim, x, y, z) {
    return hilbertIndex(dim, new Point(x, y, z))
}
exports.rotl = bitwiseRotateLeft
exports.rotr = bitwiseRotateRight
