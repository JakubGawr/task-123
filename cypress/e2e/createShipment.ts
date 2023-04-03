export const createShipment = () => {
  cy.getById('create-shipment').click();
  cy.getById('create-shipment-form-name').type('Name');
  cy.getById('create-shipment-form-autocomplete').click();
  cy.getById('create-shipment-form-autocomplete-item').first().click();
  cy.getById('create-shipment-btn').click();
};
