import AuBtn from 'src/components/ui/AuBtn.vue'

describe('AuBtn', () => {
  it('renders a message', () => {
    const label = 'Hello there'
    cy.mount(AuBtn, {
      props: {
        label,
      },
    })

    cy.dataCy('button').should('contain', label)
  })

  it('renders another message', () => {
    const label = 'Will this work?'
    cy.mount(AuBtn, {
      props: {
        label,
      },
    })

    cy.dataCy('button').should('contain', label)
  })

  it('should have a `positive` color', () => {
    const label = 'Hello there'
    const color = 'positive'
    cy.mount(AuBtn, {
      props: {
        label,
        color,
      },
    })

    cy.dataCy('button')
      .should('have.backgroundColor', 'var(--q-positive)')
      .should('have.color', 'white')
  })

  it('should emit `test` upon click', () => {
    cy.mount(AuBtn)

    cy.dataCy('button')
      .click()
      .should(() => {
        expect(Cypress.vueWrapper.emitted('on-click')).to.have.length(1)
      })
  })
})
