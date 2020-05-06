import { Component, OnInit, Input } from '@angular/core';
import { AirlinesService } from '../../airlines.service';

@Component({
  selector: '[app-airline]',
  templateUrl: './airline.component.html',
  styleUrls: ['./airline.component.css']
})
export class AirlineComponent implements OnInit {
  @Input() airline: {companyName: string, address: string, description: string};
  @Input() id: number;

  constructor(private airlinesService: AirlinesService) { }

  ngOnInit(): void {
  }

  onDelete(){
    this.airlinesService.deleteAirline(this.id);
  }
}
