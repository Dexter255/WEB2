import { Component, OnInit } from '@angular/core';
import { AirlineService } from 'src/app/components/airline.service';

@Component({
  selector: 'app-ap-airline-list',
  templateUrl: './ap-airline-list.component.html',
  styleUrls: ['./ap-airline-list.component.css']
})
export class ApAirlineListComponent implements OnInit {
  airlines: {companyName: string, description: string}[];

  constructor(private airlineService: AirlineService) { }

  ngOnInit(): void {
    this.airlines = this.airlineService.getAirlines();
  }

  onDelete(index: number){
    this.airlineService.deleteAirline(index);
  }
}
