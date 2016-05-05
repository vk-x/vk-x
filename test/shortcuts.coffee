describe "shortcuts", ->

  base = null
  shortcuts = null
  cleanShortcuts = require "inject!../src/shortcuts"

  fakeApiMethodList =
    foo0: [ "bar0", "qux0" ]
    foo1: [ "bar1", "qux1" ]
    exec: true

  fakeClientMethodList = [
    "foo2"
    "bar2"
  ]

  beforeEach ->
    shortcuts = cleanShortcuts {}

    base =
      baseMethod: sinon.spy()


  it "should add shortcuts for methods in the list", ->
    shortcuts base, base.baseMethod, fakeApiMethodList

    base.should.have.deep.property "foo0.bar0"
    base.should.have.deep.property "foo0.qux0"
    base.should.have.deep.property "foo1.bar1"
    base.should.have.deep.property "foo1.qux1"
    base.should.have.deep.property "exec"


  it "should delegate to the base method", ->
    shortcuts base, base.baseMethod, fakeApiMethodList

    params = foo: "bar"
    callback = ->

    base.foo0.qux0 params, callback
    base.baseMethod.should.have.been.calledOnce
    base.baseMethod.should.have.been.calledWith "foo0.qux0", params, callback
