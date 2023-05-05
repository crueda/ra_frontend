describe('Expenses page', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[id=tab-expenses]').click()
  })
  it('.should() - assert that expense list title is correct', () => {
    cy.contains('Histórico de gastos').should('exist')
  })
  it('.should() - assert button for add expense exist', () => {
    cy.contains('Nuevo gasto').should('exist')
  })
})
