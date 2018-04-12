/* eslint-env mocha */

import cleanIndex from 'inject-loader!../src/index' // eslint-disable-line import/no-webpack-loader-syntax

describe('index', () => {
  it('should apply shortcuts to vk', () => {
    let baseMethod
    let base = (baseMethod = null)

    const vk = cleanIndex({
      './shortcuts' (b, bm) {
        base = b
        baseMethod = bm
      }
    }).default

    base.should.equal(vk)
    baseMethod.should.equal(vk.method)
  })
})
