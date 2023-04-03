import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { WarehouseItem } from '../../../core/models/warehouseItem';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  @Input() item: WarehouseItem;
  @Input() showDescription = true;
  @Input() showActionBtn = true;

  constructor(private readonly router: Router) {}

  createShipment(id: string) {
    this.router.navigate(['shipments', 'create', id]);
  }
}
