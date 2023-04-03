import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { warehouseReducer } from './shared/+state/warehouse.reducer';
import { WarehouseEffects } from './shared/+state/warehouse.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSnackBarModule,
    StoreModule.forRoot({ warehouseStore: warehouseReducer }, {}),
    EffectsModule.forRoot([WarehouseEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
