import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  addShipment,
  deleteShipment,
  selectCurrentShipmentId,
  updateShipment,
} from './shipments.actions';
import { Shipment } from '../../../core/models/shipment';
import {
  selectedShipment,
  selectShipmentList,
  selectShipmentLoading,
  ShipmentStore,
} from './shipment.selectors';

@Injectable()
export class ShipmentsFacade {
  shipments$ = this.store.select(selectShipmentList);
  loading$ = this.store.select(selectShipmentLoading);
  currentShipment$ = this.store.select(selectedShipment);

  constructor(private readonly store: Store<ShipmentStore>) {}

  addShipment(shipment: Shipment): void {
    this.store.dispatch(addShipment({ shipment }));
  }

  updateShipment(id: string, items: Partial<Shipment>): void {
    this.store.dispatch(updateShipment({ id, shipment: items }));
  }

  deleteShipment(id: string): void {
    this.store.dispatch(deleteShipment({ id }));
  }

  setSeletedId(id: string): void {
    this.store.dispatch(selectCurrentShipmentId({ id }));
  }

  getShipmentById(id: string): Observable<Shipment | undefined> {
    return this.shipments$.pipe(
      map((shipment) => shipment.find((s) => s.id === id))
    );
  }
}
