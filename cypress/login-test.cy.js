describe('Login Tests', () => {
    beforeEach(() => {
      cy.visit('/')
    })
  
    it('Valid login', () => {
      cy.get('#email').type('valid_email@domain.com')
      cy.get('#password').type('valid_password')
      cy.get('#loginButton').click()
      cy.url().should('include', '/dashboard')
    })
  
    it('Invalid email', () => {
      cy.get('#email').type('invalid_email@domain.com')
      cy.get('#password').type('any_password')
      cy.get('#loginButton').click()
      cy.get('#error').should('contain', 'Invalid email/password')
    })
  
    it('Invalid password', () => {
      cy.get('#email').type('valid_email@domain.com')
      cy.get('#password').type('invalid_password')
      cy.get('#loginButton').click()
      cy.get('#error').should('contain', 'Invalid email/password')
    })
  
    it('SSO invitation', () => {
      cy.get('#email').type('sso_email@domain.com')
      cy.get('#loginButton').click()
      cy.get('.sso-invite').should('contain', 'Use SSO login link')
    })
  
    it('Password visibility toggle', () => {
      cy.get('#password').type('any_password')
      cy.get('.password-toggle').click()
      cy.get('#password').should('have.attr', 'type', 'text')
      cy.get('.password-toggle').click()
      cy.get('#password').should('have.attr', 'type', 'password')
    })
  
    it('Forgotten password', () => {
      cy.get('.forgot-password-link').click()
      cy.get('#resetEmail').type('valid_email@domain.com')
      cy.get('#resetButton').click()
      cy.get('.notification').should('contain', 'Reset email sent')
    })
  })
  