import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseRoutingModule } from './warehouse-routing.module';
import { WarehouseComponent } from './warehouse.component';
import { ItemsListComponent } from '../../shared/items-list/items-list.component';

@NgModule({
  declarations: [WarehouseComponent],
  imports: [CommonModule, WarehouseRoutingModule, ItemsListComponent],
})
export class WarehouseModule {}
