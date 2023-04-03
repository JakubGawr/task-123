import { createShipment } from './createShipment';

describe('My First Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Shipments', () => {
    beforeEach(() => {
      cy.visit('/shipments');
    });

    it('Should include create shipment btn', () => {
      cy.getById('create-shipment');
    });

    it('Should click and open create shipment section', () => {
      cy.getById('create-shipment').click();
      cy.getById('create-shipment-form-title');
    });

    it('should fill create shipment form', () => {
      createShipment();
    });

    it('should include new created shipment', () => {
      createShipment();
      cy.getById('create-shipment-table-row').last().contains('Name');
    });
  });
});
