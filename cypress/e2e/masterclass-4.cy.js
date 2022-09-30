/// <reference types="cypress" />

describe('API testing Master class 4 pushing IT', () => {
  xit('Deberia devolver status 200 al hacer una peticion get', () => {
    cy.request("http://localhost:3000/posts/").then(respuesta => {
      cy.log(respuesta)
      expect(respuesta.status).equal(200)
    })
  })

  it("Deberia agregar un nuevo post en nuestra base de datos", () => {
    cy.request({
      url: "http://localhost:3000/posts/",
      method: "POST",
      body: {
        "userID": "20",
        "id": 106,
        "title": "Materclass 4 Pushing IT",
        "body": "Masterclass 4 Pushing It Septiembre "
      }
    }).then(respuesta => {
      cy.log(respuesta)
      expect(respuesta.status).equal(201)
      expect(respuesta.body.id).equal(106)
    })
  })

  it("Deberia modificar un documento ya creado al utilizar PUT", () => {
    cy.request({
      url: "http://localhost:3000/posts/106",
      method: "PUT",
      body: {
        "userID": "20",
        "id": 106,
        "title": "Materclass 4 Pushing IT editado utilizando PUT",
        "body": "Masterclass 4 Pushing It Septiembre"
      }
    }).then(respuesta => {
      expect(respuesta.status).equal(200)
    })
  })

  it('Deberia devolver el documento que se edito anteriormente', () => {
    cy.request("http://localhost:3000/posts/106").then(respuesta => {
      cy.log(respuesta.body)
      expect(respuesta.status).equal(200)
    })
  })

  it("Deberia eliminar el post cuyo ID es 106", () =>{
    cy.request({
      url: "http://localhost:3000/posts/106",
      method: "DELETE"
    }).then(response =>{
      cy.log(response)
    })
  })
  
  it('Deberia mostrar 404 al querer devolver el post cuyo ID es 106', () => {
    cy.request({
      url:"http://localhost:3000/posts/106",
      failOnStatusCode: false
    }).then(respuesta => {
      cy.log(respuesta.body)
      expect(respuesta.status).equal(404)
    })
  })
})
