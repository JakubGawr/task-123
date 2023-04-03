import { createReducer, on } from '@ngrx/store';
import { WarehouseItem } from '../../core/models/warehouseItem';
import {
  addWarehouse,
  addWarehouseError,
  addWarehouseSuccess,
  updateWarehouseQuantity,
} from './warehouse.actions';
import { warehouseList } from './__mocks';

export interface WarehouseState {
  warehouse: WarehouseItem[];
  loading: boolean;
  error: null | string;
}

const initialState: WarehouseState = {
  warehouse: warehouseList,
  loading: false,
  error: null,
};

export const warehouseReducer = createReducer(
  initialState,
  on(addWarehouse, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(addWarehouseSuccess, (state, { item }) => {
    return {
      ...state,
      loading: false,
      warehouse: [...state.warehouse, item],
    };
  }),
  on(addWarehouseError, (state) => {
    return {
      ...state,
      loading: false,
      error: 'Some error has occurred',
    };
  }),
  on(updateWarehouseQuantity, (state, { items }) => {
    return {
      ...state,
      warehouse: state.warehouse.map((element) => {
        const itemToUpdate = items.find((item) => item.id === element.id);
        if (itemToUpdate) {
          return {
            ...element,
            quantity: element.quantity - itemToUpdate.quantity,
          };
        }
        return element;
      }),
    };
  })
);
