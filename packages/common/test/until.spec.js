import {expect} from 'expect'
import {until} from '@leverj/lever.common'

describe('until', () => {
  const interval = 10, timeout = 100 * interval, timing = {interval, timeout}

  it('should not wait if ready immediately', async () => {
    async function immediatelyTrue() { return 1 + 9 === 10 ? 'yeh!' : false }
    expect(await until(immediatelyTrue, timing)).toEqual('yeh!')
  })

  it('should wait if needed', async () => {
    let value = 0
    function eventuallyTrue() {
      value += 1
      return 1 + value === 10 ? 'yeh!' : false
    }
    expect(await until(eventuallyTrue, timing)).toEqual('yeh!')
  })

  it('should not wait forever', async () => {
    async function neverTrue() { return 1 + 10 === 9 ? 'yeh!' : false }
    expect(await until(neverTrue, timing)).toEqual(null)
  })
})
