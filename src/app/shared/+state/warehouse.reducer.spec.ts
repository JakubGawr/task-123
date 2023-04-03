import { warehouseReducer, WarehouseState } from './warehouse.reducer';
import { warehouseList } from './__mocks';
import {
  addWarehouse,
  addWarehouseError,
  addWarehouseSuccess,
  updateWarehouseQuantity,
} from './warehouse.actions';

const initialState: WarehouseState = {
  warehouse: warehouseList,
  loading: false,
  error: null,
};

const createItem = (id = '-100') => ({
  id,
  imageUrl: 'assets/logo_black.svg',
  name: 'CloudTalk logo sticker ',
  description:
    'High-quality sticker of the best cloud calling solution provider in  the world',
  quantity: 100,
  unitPrice: 5,
});

describe('warehouseReducer', () => {
  it('should return the initial state', () => {
    const state = warehouseReducer(undefined, {} as any);
    expect(state).toEqual(initialState);
  });

  it('should set loading to true on addWarehouse', () => {
    const state = warehouseReducer(
      initialState,
      addWarehouse({ item: createItem() })
    );
    expect(state.loading).toBe(true);
  });

  it('should add new item to the warehouse on addWarehouseSuccess', () => {
    const newItem = createItem();
    const state = warehouseReducer(
      initialState,
      addWarehouseSuccess({ item: newItem })
    );
    expect(state.warehouse).toContain(newItem);
  });

  it('should set error message on addWarehouseError', () => {
    const state = warehouseReducer(initialState, addWarehouseError());
    expect(state.error).toBe('Some error has occurred');
  });

  it('should update item quantity in the warehouse on updateWarehouseQuantity', () => {
    const itemsToUpdate = [{ ...createItem('1'), quantity: 1 }];
    const state = warehouseReducer(
      initialState,
      updateWarehouseQuantity({ items: itemsToUpdate })
    );
    const updatedItems = state.warehouse.filter((item) =>
      itemsToUpdate.find((it) => it.id === item.id)
    );
    expect(updatedItems[0].quantity).toEqual(9);
  });
});
