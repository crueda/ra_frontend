describe('Users page', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('.should() - assert that <title> is correct', () => {
    cy.title().should('include', 'Autentia')
  })
  it('.should() - assert that user list title is correct', () => {
    cy.contains('Usuarios activos').should('exist')
  })
  it('.should() - assert button for add user exist', () => {
    cy.contains('Añadir').should('exist')
  })
})
