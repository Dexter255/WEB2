import { Component, OnInit, Input } from '@angular/core';
import { RacService } from 'src/app/models/rac-service/rac-service.model';

@Component({
  selector: 'app-rac-service-detail',
  templateUrl: './rac-service-detail.component.html',
  styleUrls: ['./rac-service-detail.component.css']
})
export class RacServiceDetailComponent implements OnInit {
  @Input() racService: RacService;

  constructor() { }

  ngOnInit(): void {
  }

}
