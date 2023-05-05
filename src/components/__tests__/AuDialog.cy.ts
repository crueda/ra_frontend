import DialogWrapper from 'app/test/cypress/wrappers/DialogWrapper.vue'
import AuDialog from 'src/components/ui/AuDialog.vue'

describe('AuDialog', () => {
  it('should show a dialog with a message', () => {
    const message = 'Hello, I am a AuDialog'
    cy.mount(DialogWrapper, {
      props: {
        component: AuDialog,
        componentProps: {
          message,
        },
      },
    })

    cy.withinDialog((el) => {
      cy.wrap(el).should('contain', message)
      cy.dataCy('ok-button').click()
    })
  })

  it('should keep the dialog open when not dismissed', () => {
    const message = 'Hello, I am a AUDialog'
    cy.mount(DialogWrapper, {
      props: {
        component: AuDialog,
        componentProps: {
          message,
        },
      },
    })

    // The helper won't check for the dialog to be closed
    // when the callback completes
    cy.withinDialog({
      persistent: true,
      fn: (el) => {
        cy.wrap(el).should('contain', message)
      },
    })
  })
})
