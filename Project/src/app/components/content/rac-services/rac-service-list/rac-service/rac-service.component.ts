import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RacService } from 'src/app/models/rac-service/rac-service.model';

@Component({
  selector: 'app-rac-service',
  templateUrl: './rac-service.component.html',
  styleUrls: ['./rac-service.component.css']
})
export class RacServiceComponent implements OnInit {
  @Input() racService: RacService;  //ovde iz roditeljske komponent (rac-service-list) prosledjujem child komponenti nesto
  @Output() onSelect = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    this.onSelect.emit();
  }
}
