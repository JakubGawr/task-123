import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipmentsComponent } from './shipments.component';
import { ShipmentsCreateComponent } from './shipments-create/shipments-create.component';
import { ShipmentsEditComponent } from './shipments-edit/shipments-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ShipmentsComponent,
  },
  {
    path: 'create',
    component: ShipmentsCreateComponent,
    data: {
      mode: 'create',
    },
  },
  {
    path: 'create/:id',
    component: ShipmentsCreateComponent,
    data: {
      mode: 'create',
    },
  },
  {
    path: 'edit/:id',
    component: ShipmentsEditComponent,
    data: {
      mode: 'edit',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShipmentsRoutingModule {}
