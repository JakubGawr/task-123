import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  selectAvaiableWarehouseList,
  selectWarehouseList,
  selectWarehouseLoading,
  WarehouseStore,
} from './warehouse.selectors';
import { addWarehouse } from './warehouse.actions';
import { WarehouseItem } from '../../core/models/warehouseItem';

@Injectable({ providedIn: 'root' })
export class WarehouseFacade {
  warehouseList$ = this.store.select(selectWarehouseList);
  avaiableWarehouseList$ = this.store.select(selectAvaiableWarehouseList);
  loading$ = this.store.select(selectWarehouseLoading);

  constructor(private readonly store: Store<WarehouseStore>) {}

  addShipment(item: WarehouseItem): void {
    this.store.dispatch(addWarehouse({ item }));
  }

  getWarehouseById(id: string): Observable<WarehouseItem | undefined> {
    return this.avaiableWarehouseList$.pipe(
      map((warehouse) => warehouse.find((w) => w.id === id))
    );
  }

  getWarehouseByIds(ids: string[]): Observable<WarehouseItem[]> {
    return this.avaiableWarehouseList$.pipe(
      map((warehouse) => warehouse.filter((w) => !ids.includes(w.id)))
    );
  }
}
