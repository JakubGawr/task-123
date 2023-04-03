import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { WarehouseEffects } from './warehouse.effects';
import { addShipmentSuccess } from '../../pages/shipments/+store/shipments.actions';
import { updateWarehouseQuantity } from './warehouse.actions';
import { cold, hot } from 'jasmine-marbles';
import { SHIPMENT_STATUS } from '../../core/models/shipment';

describe('Warehgouse effects', () => {
  let effects: WarehouseEffects;
  let actions$: Observable<any>;

  const shipment = {
    status: SHIPMENT_STATUS.SHIPPED,
    shipment_date: new Date().getTime(),
    created_at: new Date().getTime(),
    name: 'test',
    id: '-1',
    items: [
      {
        name: 'test',
        quantity: 1,
        id: '0',
        imageUrl: '',
        unitPrice: 1,
        description: '',
      },
      {
        name: 'test',
        quantity: 1,
        id: '1',
        imageUrl: '',
        unitPrice: 1,
        description: '',
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [WarehouseEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.get(WarehouseEffects);
  });

  it('IF SHIPMENT_STATUS.SHIPPED should dispatch updateWarehouseQuantity on addShipmentSuccess', () => {
    const action = addShipmentSuccess({ shipment });
    const expectedAction = updateWarehouseQuantity({ items: shipment.items });
    actions$ = hot('-a', { a: action });
    const expected$ = cold('-b', { b: expectedAction });
    expect(effects.addShipment$).toBeObservable(expected$);
  });
});
