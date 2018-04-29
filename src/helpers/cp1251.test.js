/* eslint-env mocha */
/* global expect */

import { decode } from './cp1251'

const cases = [
  { decoded: '/', encoded: '/' },
  { decoded: 'https://example.com/', encoded: 'https%3A%2F%2Fexample.com%2F' },
  { decoded: 'https://www.wikiwand.com/en/Cin%C3%A9maton', encoded: 'https%3A%2F%2Fwww.wikiwand.com%2Fen%2FCin%25C3%25A9maton' }
]

describe('decode', () => {
  cases.forEach(c => it(c.decoded, () => {
    expect(decode(c.encoded)).to.equal(c.decoded)
  }))
})
