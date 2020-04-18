import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RacCompaniesService } from '../../admin-panel/admin-content/rac-companies.service';

@Component({
  selector: '[app-table-row]',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css']
})
export class TableRowComponent implements OnInit {
  @Input() data: any;
  @Input() properties: string[];
  @Input() id: number;
  @Output() deleteCommand = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onDelete(){
    this.deleteCommand.emit(this.id);
  }

  onDetails(){
    alert(this.id);
  }
}
