import {
  addShipment,
  addShipmentError,
  addShipmentSuccess,
  deleteShipment,
  selectCurrentShipmentId,
  updateShipment,
  updateShipmentError,
  updateShipmentSuccess,
} from './shipments.actions';
import { Shipment } from '../../../core/models/shipment';
import { createReducer, on } from '@ngrx/store';

export interface ShipmentState {
  shipments: Shipment[];
  loading: boolean;
  selectedShipmentId: string | null;
  error: null | string;
}

const initialState: ShipmentState = {
  shipments: [],
  selectedShipmentId: null,
  loading: false,
  error: null,
};

export const scoreboardReducer = createReducer(
  initialState,
  on(addShipment, updateShipment, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(addShipmentSuccess, (state, { shipment }) => {
    return {
      ...state,
      loading: false,
      shipments: [...state.shipments, shipment],
    };
  }),
  on(addShipmentError, updateShipmentError, (state) => {
    return {
      ...state,
      loading: false,
      error: 'Some error has occurred',
    };
  }),
  on(selectCurrentShipmentId, (state, { id }) => {
    return {
      ...state,
      selectedShipmentId: id,
    };
  }),
  on(updateShipmentSuccess, (state, { id, shipment }) => {
    return {
      ...state,
      loading: false,
      shipments: state.shipments.map((s) =>
        s.id === id ? { ...s, ...shipment } : s
      ),
    };
  }),
  on(deleteShipment, (state, { id }) => {
    return {
      ...state,
      shipments: state.shipments.filter((s) => s.id !== id),
    };
  })
);
