import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AirlineService } from 'src/app/components/airline.service';

@Component({
  selector: 'app-ap-add-airline',
  templateUrl: './ap-add-airline.component.html',
  styleUrls: ['./ap-add-airline.component.css']
})
export class ApAddAirlineComponent implements OnInit {
  addAirline: FormGroup;
  edit: boolean = false;
  header: string = 'Add airline';
  id: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private airlineService: AirlineService) { }

  ngOnInit(): void {
    switch (this.route.snapshot['_routerState'].url.split('/')[3]) {
      case 'add':
        this.addAirline = new FormGroup({
          'companyName': new FormControl(null, [Validators.required, Validators.minLength(4)]),
          'description': new FormControl(null, Validators.required)
        })
        break;

      case 'edit':
        this.route.params.subscribe((params: Params) => {
          this.edit = true;
          this.header = "Edit airline";
          this.id = +params['id'];

          let airline = this.airlineService.getAirline(this.id);

          this.addAirline = new FormGroup({
            'companyName': new FormControl(airline.companyName, [Validators.required, Validators.minLength(4)]),
            'description': new FormControl(airline.description, Validators.required)
          })
        });
        break;
    }
  }

  onSubmit() {
    let airline = {
      companyName: this.addAirline.get('companyName').value,
      description: this.addAirline.get('description').value
    };

    if(this.edit){
      this.airlineService.updateAirline(this.id, airline);
      this.router.navigate(['../../'], { relativeTo: this.route });
    }
    else{
      this.airlineService.addAirline(airline);
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }
}
