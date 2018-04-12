/* eslint-env mocha */
/* global sinon */

import cleanShortcuts from 'inject-loader!./shortcuts' // eslint-disable-line import/no-webpack-loader-syntax

describe('shortcuts', () => {
  let base = null
  let shortcuts = null

  const fakeApiMethodList = {
    foo0: [ 'bar0', 'qux0' ],
    foo1: [ 'bar1', 'qux1' ],
    exec: true
  }

  beforeEach(() => {
    shortcuts = cleanShortcuts({}).default
    base = {baseMethod: sinon.spy()}
  })

  it('should add shortcuts for methods in the list', () => {
    shortcuts(base, base.baseMethod, fakeApiMethodList)

    base.should.have.deep.property('foo0.bar0')
    base.should.have.deep.property('foo0.qux0')
    base.should.have.deep.property('foo1.bar1')
    base.should.have.deep.property('foo1.qux1')
    base.should.have.deep.property('exec')
  })

  it('should delegate to the base method', () => {
    shortcuts(base, base.baseMethod, fakeApiMethodList)

    const params = {foo: 'bar'}
    const callback = () => {}

    base.foo0.qux0(params, callback)
    base.baseMethod.should.have.been.calledOnce // eslint-disable-line no-unused-expressions
    base.baseMethod.should.have.been.calledWith('foo0.qux0', params, callback)
  })
})
