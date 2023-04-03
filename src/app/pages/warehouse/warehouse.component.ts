import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { WarehouseItem } from '../../core/models/warehouseItem';
import { WarehouseFacade } from '../../shared/+state/warehouse.facade';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarehouseComponent {
  items$: Observable<WarehouseItem[]> = this.warehouseFacade.warehouseList$;

  constructor(private warehouseFacade: WarehouseFacade) {}
}
