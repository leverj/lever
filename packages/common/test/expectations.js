import {expect} from 'expect'
import {isEqual} from 'lodash-es'


expect.extend({
  toIncludeSameMembers(actual, expected) {
    return isEqual(new Set(actual), new Set(expected)) ?
      { message: () => `expected collection ${actual} does not match the members of:\n\n${expected}`, pass: true } :
      { message: () => `expected collection ${actual} does match the members of:\n\n${expected}`, pass: false }
  }
})
