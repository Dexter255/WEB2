import { Component, OnInit } from '@angular/core';
import { RacService } from 'src/app/models/rac-service/rac-service.model';

@Component({
  selector: 'app-rac-services',
  templateUrl: './rac-services.component.html',
  styleUrls: ['./rac-services.component.css']
})
export class RacServicesComponent implements OnInit {
  selectedService: RacService;
    
  constructor() { }

  ngOnInit(): void {
  }

  onSelectedService(racService: RacService){
    this.selectedService = racService;
  }
}
