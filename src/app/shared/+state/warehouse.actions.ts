import { createAction, props } from '@ngrx/store';
import { WarehouseItem } from '../../core/models/warehouseItem';

export const addWarehouse = createAction(
  '[Warehouse] add warehouse',
  props<{ item: WarehouseItem }>()
);

export const addWarehouseSuccess = createAction(
  '[Warehouse] add warehouse success',
  props<{ item: WarehouseItem }>()
);

export const addWarehouseError = createAction(
  '[Warehouse] add warehouse error'
);

export const updateWarehouseQuantity = createAction(
  '[Warehouse] update quantity',
  props<{ items: WarehouseItem[] }>()
);
