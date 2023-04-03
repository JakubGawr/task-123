import { createSelector } from '@ngrx/store';
import { WarehouseState } from './warehouse.reducer';

export const WAREHOUSE_FEATURE_KEY = 'warehouseStore';

export interface WarehouseStore {
  warehouseStore: WarehouseState;
}

const selectShipment = (state: WarehouseStore) => state.warehouseStore;

export const selectWarehouseList = createSelector(
  selectShipment,
  (state: WarehouseState) => state.warehouse
);

export const selectAvaiableWarehouseList = createSelector(
  selectShipment,
  (state: WarehouseState) =>
    state.warehouse.filter(({ quantity }) => quantity > 0)
);

export const selectWarehouseLoading = createSelector(
  selectShipment,
  (state: WarehouseState) => state.loading
);

export const selectWarehouseError = createSelector(
  selectShipment,
  (state: WarehouseState) => state.error
);
