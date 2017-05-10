describe "index", ->

  cleanIndex = require "inject!../src/index"

  it "should apply shortcuts to vk", ->
    base = baseMethod = null

    vk = cleanIndex
      "./shortcuts": ( b, bm ) ->
        base = b
        baseMethod = bm

    base.should.equal vk
    baseMethod.should.equal vk.method
