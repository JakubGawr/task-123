import { createAction, props } from '@ngrx/store';
import { Shipment } from '../../../core/models/shipment';

export const addShipment = createAction(
  '[Shipment] add',
  props<{ shipment: Shipment }>()
);

export const addShipmentSuccess = createAction(
  '[Shipment] add shipment success',
  props<{ shipment: Shipment }>()
);

export const addShipmentError = createAction('[Shipment] add shipment error');

export const selectCurrentShipmentId = createAction(
  '[Shipment] select current shipment id',
  props<{ id: string }>()
);

export const updateShipment = createAction(
  '[Shipment] update shipment',
  props<{ id: string; shipment: Partial<Shipment> }>()
);

export const updateShipmentSuccess = createAction(
  '[Shipment] update shipment success',
  props<{ id: string; shipment: Partial<Shipment> }>()
);

export const updateShipmentError = createAction(
  '[Shipment] update shipment error'
);

export const deleteShipment = createAction(
  '[Shipment] delete shipment',
  props<{ id: string }>()
);
