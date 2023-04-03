import { createSelector } from '@ngrx/store';
import { ShipmentState } from './shipment.reducer';

export const SCOREBOARD_FEATURE_KEY = 'scoreBoard';

export interface ShipmentStore {
  scoreBoard: ShipmentState;
}

const selectShipment = (state: ShipmentStore) => state.scoreBoard;

export const selectShipmentList = createSelector(
  selectShipment,
  (state: ShipmentState) => state.shipments
);

export const selectShipmentLoading = createSelector(
  selectShipment,
  (state: ShipmentState) => state.loading
);

export const selectShipmentError = createSelector(
  selectShipment,
  (state: ShipmentState) => state.error
);

export const selectedShipment = createSelector(
  selectShipment,
  (state: ShipmentState) => {
    return state.shipments.find(({ id }) => id === state.selectedShipmentId);
  }
);
