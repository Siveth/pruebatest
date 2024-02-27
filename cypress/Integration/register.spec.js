
///<reference  types="cypress"/>
describe('Registro de usuario', () => {
    it('Permite completar el formulario y enviar', () => {
      cy.visit('/register') // Asegúrate de que esta ruta sea correcta
      cy.get('#nombre').type('John')
      cy.get('#apellidoP').type('Doe')
      cy.get('#apellidoM').type('Smith')
      cy.get('#correo').type('john.doe@example.com')
      cy.get('#telefono').type('1234567890')
      cy.get('#contrasenia').type('password')
      cy.get('#repetirContrasena').type('password')
      cy.get('#edad').type('1990-01-01')
      cy.get('.g-recaptcha').click() // Simula hacer clic en el reCAPTCHA
      cy.get('button[type="submit"]').click()
      cy.contains('Registro exitoso').should('be.visible')
    })
  
    it('Muestra mensajes de error apropiados para campos vacíos', () => {
      cy.visit('/register')
      cy.get('button[type="submit"]').click()
      cy.contains('Hay campos vacíos').should('be.visible')
    })
  
    it('Muestra mensaje de error para contraseñas que no coinciden', () => {
      cy.visit('/register')
      cy.get('#contrasenia').type('password')
      cy.get('#repetirContrasena').type('differentpassword')
      cy.get('button[type="submit"]').click()
      cy.contains('Las contraseñas no coinciden').should('be.visible')
    })

  })
  