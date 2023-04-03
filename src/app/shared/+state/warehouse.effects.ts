import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  addWarehouse,
  addWarehouseError,
  addWarehouseSuccess,
  updateWarehouseQuantity,
} from './warehouse.actions';
import { serverMock } from '../../mock-helpers';
import {
  addShipmentSuccess,
  updateShipmentSuccess,
} from '../../pages/shipments/+store/shipments.actions';
import { SHIPMENT_STATUS } from '../../core/models/shipment';

@Injectable()
export class WarehouseEffects {
  addShipment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addShipmentSuccess, updateShipmentSuccess),
      switchMap((action) =>
        action.shipment.status === SHIPMENT_STATUS.SHIPPED
          ? of(updateWarehouseQuantity({ items: action.shipment.items || [] }))
          : EMPTY
      )
    )
  );

  addWarehouse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addWarehouse),
      switchMap((action) =>
        serverMock(action).pipe(
          map(() => addWarehouseSuccess({ item: action.item })),
          catchError(() => of(addWarehouseError()))
        )
      )
    )
  );

  constructor(private readonly actions$: Actions) {}
}
