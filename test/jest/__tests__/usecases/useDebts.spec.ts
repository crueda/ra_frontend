import { describe, expect, it } from '@jest/globals'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest'
import useDebts from '../../../../src/usecases/useDebts.js'

installQuasarPlugin()

const { splitPayments } = useDebts()

describe('useDebts', () => {
  it('split payments function', () => {
    const payments = {
      John: 400,
      Jane: 1000,
      Bob: 100,
      Dave: 900,
    }
    const out = [
      {
        userIdOrigin: 'Bob',
        userIdDestination: 'Jane',
        amount: '400.00',
      },
      {
        userIdOrigin: 'Bob',
        userIdDestination: 'Dave',
        amount: '100.00',
      },
      {
        userIdOrigin: 'John',
        userIdDestination: 'Dave',
        amount: '200.00',
      },
    ]
    expect(splitPayments(payments)).toEqual(out)
  })
})
