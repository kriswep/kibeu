/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('http://localhost:3000/signin');
  });

  it('should have necessary signin elements', () => {
    cy.get('input[type=text]').type('Email@example.com');

    cy.get('input[type=password]').type('secretPassword!');

    cy.get('[type=submit]');
  });

  it('should link to the signup page instead', () => {
    cy.get('a[href*="signup"]').click();
    cy.url().should('include', '/signup');
  });
});
