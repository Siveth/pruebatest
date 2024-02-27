
///<reference  types="cypress"/>
describe('Registro de usuario', () => {
    it('Permite completar el formulario y enviar', () => {
      cy.visit('https://siveth-app.vercel.app/Registro') // Asegúrate de que esta ruta sea correcta
      cy.get('#nombre').type('John')
      cy.get('#apellidopa').type('Doe')
      cy.get('#apellidoma').type('Smith')
      cy.get('#edad').type('1990-01-01')
      cy.get('#correo').type('john.doe@example.com')
      cy.get('#telefono').type('1234567890')
      cy.get('#contrasenia').type('password')
      cy.get('#repetirContrasena').type('password')
      cy.get('#miCaptchaElemento').click(); // Selecciona el elemento ReCAPTCHA con el id "miCaptchaElemento" y realiza un clic en él
      cy.get('button[type="submit"]').click()
      cy.on('window:alert', (message) => {
        expect(message).to.equal('Registro exitoso\nTu cuenta ha sido registrada correctamente');
      });

    })
  
    // it('Muestra mensajes de error apropiados para campos vacíos', () => {
    //   cy.visit('http://localhost:5173/Registro')
    //   cy.get('button[type="submit"]').click()
    //   cy.contains('Hay campos vacíos').should('be.visible')
    // })
  
    // it('Muestra mensaje de error para contraseñas que no coinciden', () => {
    //   cy.visit('http://localhost:5173/Registro')
    //   cy.get('#contrasenia').type('password')
    //   cy.get('#repetirContrasena').type('differentpassword')
    //   cy.get('button[type="submit"]').click()
    //   cy.contains('Las contraseñas no coinciden').should('be.visible')
    // })

  })
  