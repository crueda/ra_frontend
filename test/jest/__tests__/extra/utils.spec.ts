import { expect } from '@jest/globals'
import { validateEmail } from '../../../../src/util/utils.js'

describe('validateEmail', () => {
  it('check an email is NOT in valid formal', () => {
    expect(validateEmail('email')).toBeFalsy()
  })

  it('check an email is in valid formal', () => {
    expect(validateEmail('email@gmail.com')).toBeTruthy()
  })
})
