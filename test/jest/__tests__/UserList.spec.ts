import { beforeEach, describe, expect, it } from '@jest/globals'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest'
import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils'
import UserList from './demo/UserList'

installQuasarPlugin()

describe('UserList', () => {
  let wrapper: VueWrapper<InstanceType<typeof UserList>>

  beforeEach(() => {
    wrapper = mount(UserList)
    wrapper.vm.userList = []
  })

  it('should mount the document body and expose for testing', () => {
    const bodyWrapper = new DOMWrapper(document.body)

    expect(bodyWrapper.find('.q-toolbar-title').exists()).toBeTruthy()
    // expect(bodyWrapper.find('.q-list').exists()).toBeTruthy()
  })

  it('can check the inner text of the dialog', () => {
    const bodyWrapper = new DOMWrapper(document.body)

    // expect(bodyWrapper.get('.q-toolbar-title').html()).toContain('Usuarios activos')
  })
})
