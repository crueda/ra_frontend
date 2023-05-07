import UserListElement from 'src/components/users/UserListElement.vue'
import { PropType, ref } from 'vue'
import { User } from './models'

describe('UserListElement', () => {
  it('renders a user element', () => {
    const userData = {
      id: 1,
      username: 'Username',
      name: 'User complete name',
      email: 'user@email.com',
      letter: 'U',
      selected: false,
    }

    cy.mount(UserListElement, {
      props: {
        data: userData,
      },
    })

    cy.dataCy('qitem').should('contain', 'Username')
  })

  it('User element have active class when selected', () => {
    const userData = {
      id: 1,
      username: 'Username',
      name: 'User complete name',
      email: 'user@email.com',
      letter: 'U',
      selected: true,
    }

    cy.mount(UserListElement, {
      props: {
        data: userData,
      },
    })

    cy.dataCy('qitem').should('have.class', 'bg-blue-2', 'true')
  })
})
