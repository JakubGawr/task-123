import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipmentsModule } from './pages/shipments/shipments.module';
import { WarehouseModule } from './pages/warehouse/warehouse.module';

const routes: Routes = [
  {
    path: 'warehouse',
    loadChildren: () => WarehouseModule,
  },
  {
    path: 'shipments',
    loadChildren: () => ShipmentsModule,
  },
  { path: '**', redirectTo: '/warehouse' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
