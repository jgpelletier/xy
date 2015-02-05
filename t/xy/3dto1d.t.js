#!/usr/bin/env node

require('proof')(1, function (assert) {
  var hilbert = require('../..')

  assert(hilbert.xyz2d(16, 2, 2), 8)
  /*
  console.log(hilbert.xyz2d(0,0,0))
  console.log(hilbert.xyz2d(0,1,0))
  console.log(hilbert.xyz2d(0,1,1))
  console.log(hilbert.xyz2d(0,0,1))
  console.log(hilbert.xyz2d(1,0,1))
  console.log(hilbert.xyz2d(1,1,1))
  console.log(hilbert.xyz2d(1,1,0))
  console.log(hilbert.xyz2d(1,0,0))
  hilbert.xyz2d(0,0,0)
  hilbert.xyz2d(0,1,0)
  hilbert.xyz2d(0,1,1)
  hilbert.xyz2d(0,0,1)
  hilbert.xyz2d(1,0,1)
  hilbert.xyz2d(1,1,1)
  hilbert.xyz2d(1,1,0)
  hilbert.xyz2d(1,0,0)
  */
})
