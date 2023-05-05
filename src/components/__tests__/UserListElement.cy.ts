import UserListElement from 'src/components/users/UserListElement.vue'
import { ref } from 'vue'
import { User } from './models'

describe('UserListElement', () => {
  it('renders a user element', () => {
    const userData = ref<User>({
      id: 1,
      username: '',
      name: 'User complete name',
      email: '',
    })
    /*
    cy.mount(UserListElement, {
      props: {
        data: userData,
      },
    })
*/

    // cy.dataCy('qitem').should('have.attr', 'q.focusable', 'true')
  })
})
