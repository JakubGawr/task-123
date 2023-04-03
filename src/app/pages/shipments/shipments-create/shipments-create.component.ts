import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { filter, Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import { map } from 'rxjs/operators';
import { SHIPMENT_STATUS } from '../../../core/models/shipment';
import { ShipmentsFacade } from '../+store/shipments.facade';
import { WarehouseFacade } from '../../../shared/+state/warehouse.facade';
import { WarehouseItem } from '../../../core/models/warehouseItem';
import { ShipmentsFormComponent } from '../shipments-form/shipments-form.component';

let id = 0;

@Component({
  selector: 'app-shipments-create',
  templateUrl: './shipments-create.component.html',
  styleUrls: ['./shipments-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipmentsCreateComponent implements AfterViewInit {
  private readonly destroy$ = new Subject();

  readonly isLoading$: Observable<boolean> = this.shipmentsFacade.loading$;

  warehouseList$: Observable<WarehouseItem[]> = of([]);
  form = this.fb.group({
    name: ['', [Validators.required]],
    shipDate: [new Date(), [Validators.required]],
    warehouseItems: this.fb.array([], Validators.required),
    status: [SHIPMENT_STATUS.CREATED, [Validators.required]],
  });

  @ViewChild(ShipmentsFormComponent, { read: ShipmentsFormComponent })
  shipmentsFormComponent: ShipmentsFormComponent;

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

  displayWith({ name }: WarehouseItem): string {
    return name;
  }

  createShipment(): void {
    const { name, shipDate, warehouseItems, status } = this.form.getRawValue();
    this.shipmentsFacade.addShipment({
      id: (id++).toString(),
      name,
      items: warehouseItems as WarehouseItem[],
      shipment_date: shipDate.getTime(),
      created_at: new Date().getTime(),
      status,
    });
  }

  ngAfterViewInit(): void {
    this.activatedRoute.params
      .pipe(
        map((params: Params) => params['id']),
        switchMap((id) => this.warehouseFacade.getWarehouseById(id)),
        takeUntil(this.destroy$),
        filter(Boolean)
      )
      .subscribe((item) => {
        this.shipmentsFormComponent.addWareHouse(item);
        this.cdr.detectChanges();
      });
  }
}
