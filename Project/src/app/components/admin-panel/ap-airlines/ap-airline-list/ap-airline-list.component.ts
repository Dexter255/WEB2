import { Component, OnInit } from '@angular/core';
import { AirlineService } from 'src/app/components/airline.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerService } from 'src/app/components/server.service';

@Component({
  selector: 'app-ap-airline-list',
  templateUrl: './ap-airline-list.component.html',
  styleUrls: ['./ap-airline-list.component.css']
})
export class ApAirlineListComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    public airlineService: AirlineService) { }

  ngOnInit(): void {
    this.airlineService.getAirlines().subscribe(
      res => { },
      err => {
        console.log(err);
      }
    );
  }

  onAddAirline() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  onDeleteAirline(airlineId: number) {
    this.airlineService.deleteAirline(airlineId).subscribe(
      res => {
        this.airlineService.getAirlines().subscribe(
          res => { },
          err => {
            console.log(err);
          }
        );
      },
      err => {

      }
    );
  }

  onEditAirline(airlineId: number) {
    this.router.navigate(['edit', airlineId], { relativeTo: this.route });
  }

  onDetailsAirline(airlineId: number) {
    this.router.navigate(['details', airlineId], { relativeTo: this.route });
  }

  onSeeFlights(airlineId: number) {
    this.router.navigate([airlineId, 'flights'], { relativeTo: this.route });
  }

  onSeeIncome(airlineId: number){
    this.router.navigate([airlineId, 'income'], { relativeTo: this.route });    
  }
}
