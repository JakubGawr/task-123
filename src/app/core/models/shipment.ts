import { WarehouseItem } from './warehouseItem';

export enum SHIPMENT_STATUS {
  CREATED = 'created',
  PREPEND = 'prepend',
  SHIPPED = 'shipped',
}

export interface Shipment {
  name: string;
  id: string;
  status: SHIPMENT_STATUS;
  created_at: number;
  shipment_date: number;
  items: WarehouseItem[];
}
