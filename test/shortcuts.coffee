describe "shortcuts", ->

  base = null
  shortcuts = null
  shortcutsFactory = require "inject!../src/shortcuts"

  beforeEach ->
    shortcuts = shortcutsFactory
      "./method-list":
        foo0: [ "bar0", "qux0" ]
        foo1: [ "bar1", "qux1" ]

    base =
      baseMethod: sinon.spy()


  it "should add shortcuts for methods in the list", ->
    shortcuts base, base.baseMethod

    base.should.have.deep.property "foo0.bar0"
    base.should.have.deep.property "foo0.qux0"
    base.should.have.deep.property "foo1.bar1"
    base.should.have.deep.property "foo1.qux1"


  it "should delegate to the base method", ->
    shortcuts base, base.baseMethod

    params = foo: "bar"
    callback = ->

    base.foo0.qux0 params, callback
    base.baseMethod.should.have.been.calledOnce
    base.baseMethod.should.have.been.calledWith "foo0.qux0", params, callback


  it "should add a shortcut for the execute method", ->
    shortcuts base, base.baseMethod

    base.should.have.property "execute"
