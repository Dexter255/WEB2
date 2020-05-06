import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AirlinesService } from '../airlines.service';

@Component({
  selector: 'app-add-airline',
  templateUrl: './add-airline.component.html',
  styleUrls: ['./add-airline.component.css']
})
export class AddAirlineComponent implements OnInit {
  addAirline: FormGroup;
  edit: boolean = false;
  header: string = 'Add airline';
  id: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private airlinesService: AirlinesService) { }

  ngOnInit(): void {
    switch (this.route.snapshot['_routerState'].url.split('/')[3]) {
      case 'add':
        this.addAirline = new FormGroup({
          'companyName': new FormControl(null, [Validators.required, Validators.minLength(4)]),
          'address': new FormControl(null, Validators.required),
          'description': new FormControl(null, Validators.required)
        })
        break;

      case 'edit':
        this.route.params.subscribe((params: Params) => {
          this.edit = true;
          this.header = "Edit airline";
          this.id = +params['id'];

          let airline = this.airlinesService.getAirline(this.id);

          this.addAirline = new FormGroup({
            'companyName': new FormControl(airline.companyName, [Validators.required, Validators.minLength(4)]),
            'address': new FormControl(airline.address, Validators.required),
            'description': new FormControl(airline.description, Validators.required)
          })
        });
        break;
    }
  }

  onSubmit() {
    let airline = {
      companyName: this.addAirline.get('companyName').value,
      address: this.addAirline.get('address').value,
      description: this.addAirline.get('description').value
    };

    if(this.edit)
      this.airlinesService.updateAirline(this.id, airline);
    else
      this.airlinesService.addAirline(airline);

    if (this.edit)
      this.router.navigate(['../../'], { relativeTo: this.route });
    else
      this.router.navigate(['../'], { relativeTo: this.route });

  }
}