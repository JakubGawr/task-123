import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, of, startWith, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { WarehouseItem } from '../../../core/models/warehouseItem';
import { WarehouseFacade } from '../../../shared/+state/warehouse.facade';
import { SHIPMENT_STATUS } from '../../../core/models/shipment';

@Component({
  selector: 'app-shipments-form',
  templateUrl: './shipments-form.component.html',
  styleUrls: ['./shipments-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShipmentsFormComponent implements OnInit {
  @Input() form: FormGroup;

  readonly autoCompleteControl = this.fb.control('');
  readonly shipStatus = SHIPMENT_STATUS;
  warehouseList$: Observable<WarehouseItem[]> = of([]);

  constructor(
    private readonly fb: FormBuilder,
    private readonly cdr: ChangeDetectorRef,
    private readonly warehouseFacade: WarehouseFacade
  ) {}

  get nameCtrl() {
    return this.form.get('name');
  }

  get shipDateCtrl() {
    return this.form.get('shipDate');
  }

  get wareHouseFormArray() {
    return this.form.get('warehouseItems') as FormArray;
  }

  onSelectedOption({ option: { value } }: MatAutocompleteSelectedEvent) {
    this.addWareHouse(value);
  }

  displayWith({ name }: WarehouseItem): string {
    return name;
  }

  addWareHouse({ quantity, ...rest }: WarehouseItem): void {
    this.wareHouseFormArray.push(
      this.fb.group({
        ...rest,
        quantity: [
          1,
          [Validators.max(quantity), Validators.min(1), Validators.required],
        ],
      })
    );
  }

  ngOnInit(): void {
    this.warehouseList$ = this.wareHouseFormArray.valueChanges.pipe(
      startWith(this.wareHouseFormArray.value),
      map((item: null | WarehouseItem[]) =>
        item ? item.map(({ id }) => id) : []
      ),
      switchMap((ids) => this.warehouseFacade.getWarehouseByIds(ids))
    );
  }
}
