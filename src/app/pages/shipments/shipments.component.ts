import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Shipment } from '../../core/models/shipment';
import { ShipmentsFacade } from './+store/shipments.facade';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ShipmentsComponent implements OnInit {
  $shipments: Observable<Shipment[]>;
  expandedElement: Shipment | null;

  readonly columnsToDisplay = [
    'name',
    'id',
    'status',
    'created_at',
    'shipment_date',
  ];
  readonly columnsToDisplayWithExpand = [
    ...this.columnsToDisplay,
    'expand',
    'dropdown',
  ];
  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly shipmentsFacade: ShipmentsFacade
  ) {}

  ngOnInit(): void {
    this.$shipments = this.shipmentsFacade.shipments$;
  }

  createShipment(): void {
    this.router.navigate(['create'], {
      relativeTo: this.activatedRoute,
    });
  }

  editElement(id: string) {
    this.router.navigate(['edit', id], {
      relativeTo: this.activatedRoute,
    });
  }

  deleteElement(id: string) {
    this.shipmentsFacade.deleteShipment(id);
  }
}
