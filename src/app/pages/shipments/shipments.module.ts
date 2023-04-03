import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipmentsComponent } from './shipments.component';
import { ShipmentsCreateComponent } from './shipments-create/shipments-create.component';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ShipmentsRoutingModule } from './shipments-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { scoreboardReducer } from './+store/shipment.reducer';
import { ShipmentsFacade } from './+store/shipments.facade';
import { SCOREBOARD_FEATURE_KEY } from './+store/shipment.selectors';
import { EffectsModule } from '@ngrx/effects';
import { ShipmentEffects } from './+store/shipment.effects';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { ShipmentsEditComponent } from './shipments-edit/shipments-edit.component';
import { ShipmentsFormComponent } from './shipments-form/shipments-form.component';
import { ListItemComponent } from '../../shared/items-list/list-item/list-item.component';

@NgModule({
  declarations: [
    ShipmentsComponent,
    ShipmentsCreateComponent,
    ShipmentsEditComponent,
    ShipmentsFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ShipmentsRoutingModule,
    StoreModule.forFeature(SCOREBOARD_FEATURE_KEY, scoreboardReducer),
    EffectsModule.forFeature([ShipmentEffects]),
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatTableModule,
    MatSelectModule,
    MatMenuModule,
    ListItemComponent,
  ],
  providers: [ShipmentsFacade],
})
export class ShipmentsModule {}
