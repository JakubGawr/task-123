import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
  withLatestFrom,
} from 'rxjs';
import { map } from 'rxjs/operators';
import { WarehouseItem } from '../../../core/models/warehouseItem';
import { WarehouseFacade } from '../../../shared/+state/warehouse.facade';
import { ShipmentsFacade } from '../+store/shipments.facade';

@Component({
  selector: 'app-shipments-edit',
  templateUrl: './shipments-edit.component.html',
  styleUrls: ['./shipments-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipmentsEditComponent implements AfterViewInit, OnDestroy {
  protected readonly destroy$ = new Subject();

  readonly isLoading$: Observable<boolean> = this.shipmentsFacade.loading$;

  form: FormGroup;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly cdr: ChangeDetectorRef,
    private readonly fb: NonNullableFormBuilder,
    private readonly router: Router,
    private readonly shipmentsFacade: ShipmentsFacade,
    private readonly warehouseFacade: WarehouseFacade
  ) {}

  back(): void {
    this.router.navigate(['shipments']);
  }

  update(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    const { warehouseItems, ...rest } = this.form.getRawValue();
    this.shipmentsFacade.updateShipment(id, { items: warehouseItems, ...rest });
  }

  ngAfterViewInit(): void {
    this.activatedRoute.params
      .pipe(
        map((params: Params) => params['id']),
        switchMap((id) => this.shipmentsFacade.getShipmentById(id)),
        withLatestFrom(this.warehouseFacade.avaiableWarehouseList$),
        takeUntil(this.destroy$)
      )
      .subscribe(([shipment, warehouseList]) => {
        if (shipment) {
          this.form = this.fb.group({
            status: [shipment.status, [Validators.required]],
            name: [shipment.name, [Validators.required]],
            shipDate: [new Date(shipment.shipment_date), [Validators.required]],
            warehouseItems: this.fb.array(
              this.buildArrayItems(shipment.items, warehouseList),
              Validators.required
            ),
          });
          this.cdr.detectChanges();
        } else {
          this.router.navigate(['shipments']);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  private buildArrayItems(
    items: WarehouseItem[],
    warehouseList: WarehouseItem[]
  ): FormGroup[] {
    return items.map((data) => {
      const itemFromStore = warehouseList.find((w) => w.id === data.id);
      return this.fb.group({
        ...data,
        quantity: [
          data.quantity,
          [
            Validators.max(itemFromStore?.quantity || 0),
            Validators.min(1),
            Validators.required,
          ],
        ],
      });
    });
  }
}
