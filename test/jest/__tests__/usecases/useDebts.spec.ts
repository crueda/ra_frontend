import { describe, expect, it } from '@jest/globals'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest'
import useDebts from '../../../../src/domain/usecases/useDebts.js'

installQuasarPlugin()

const { splitPayments } = useDebts()

describe('useDebts', () => {
  it('split payments function with 1 user', () => {
    const payments = {
      Pedro: 400,
    }
    const out: unknown = []
    expect(splitPayments(payments)).toEqual(out)
  })

  it('split payments function with 2 user', () => {
    const payments = {
      Pedro: 400,
      Juan: 0,
    }
    const out = [
      {
        userIdOrigin: 'Juan',
        userIdDestination: 'Pedro',
        amount: '200.00',
      },
    ]
    expect(splitPayments(payments)).toEqual(out)
  })

  it('split payments function with 4 users', () => {
    const payments = {
      Pedro: 400,
      Lucia: 1000,
      Juan: 100,
      Ines: 900,
    }
    const out = [
      {
        userIdOrigin: 'Juan',
        userIdDestination: 'Lucia',
        amount: '400.00',
      },
      {
        userIdOrigin: 'Juan',
        userIdDestination: 'Ines',
        amount: '100.00',
      },
      {
        userIdOrigin: 'Pedro',
        userIdDestination: 'Ines',
        amount: '200.00',
      },
    ]
    expect(splitPayments(payments)).toEqual(out)
  })
})
