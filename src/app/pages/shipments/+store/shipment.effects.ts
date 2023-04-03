import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addShipment,
  addShipmentError,
  addShipmentSuccess,
  updateShipment,
  updateShipmentError,
  updateShipmentSuccess,
} from './shipments.actions';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { serverMock } from '../../../mock-helpers';

@Injectable()
export class ShipmentEffects {
  addShipment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addShipment),
      switchMap((action) =>
        serverMock(action).pipe(
          map(() => addShipmentSuccess(action)),
          catchError(() => of(addShipmentError()))
        )
      )
    )
  );

  addShipmentError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addShipmentError, updateShipmentError),
        tap(() => {
          this._snackBar.open('Something went wrong', 'cancel', {
            duration: 5000,
          });
        })
      ),
    { dispatch: false }
  );

  addShipmentSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addShipmentSuccess, updateShipmentSuccess),
        tap((value: Action) => {
          this._snackBar.open(value.type, 'cancel', { duration: 5000 });
          this.router.navigate(['shipments']);
        })
      ),
    { dispatch: false }
  );

  updateShipment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateShipment),
      switchMap((action) =>
        serverMock(action).pipe(
          map(() => updateShipmentSuccess(action)),
          catchError(() => of(updateShipmentError()))
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly _snackBar: MatSnackBar,
    private readonly router: Router
  ) {}
}
