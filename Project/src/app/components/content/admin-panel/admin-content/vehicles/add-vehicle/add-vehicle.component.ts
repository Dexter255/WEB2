import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Type } from 'src/app/models/rent-a-car/type.model';
import { Vehicle } from 'src/app/models/rent-a-car/vehicle.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RacCompaniesService } from '../../rac-companies/rac-companies.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
  addVehicle: FormGroup;

  types: string[] = ['Cabriolet', 'Caravan', 'Saloon', 'Hatchback', 'Coupe', 'Miniven', 'SUV'];
  seats: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  edit: boolean = false;
  header: string = 'Add vehicle';
  id: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private racCompaniesService: RacCompaniesService) { }

  ngOnInit(): void {
    switch(this.route.snapshot['_routerState'].url.split('/')[5]){
      case 'add':
        this.addVehicle = new FormGroup({
          'brand': new FormControl(null, [Validators.required, Validators.minLength(2)]),
          'model': new FormControl(null, [Validators.required, Validators.minLength(2)]),
          'type': new FormControl(null, Validators.required),
          'cubicCapacity': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
          'horsePower': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
          'yearOfProduction': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
          'kilometer': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
          'seat': new FormControl(null, Validators.required)
        });
        break;

      case 'edit':
        this.route.params.subscribe((params: Params) => {
          this.edit = true;
          this.header = "Edit admin";
          this.id = +params['id'];
          let vehicle: Vehicle;
          
          let companyId = this.route.snapshot['_routerState'].url.split('/')[3];
          vehicle = this.racCompaniesService.getRacCompany(companyId).vehicles[this.id];
          
          this.addVehicle = new FormGroup({
            'brand': new FormControl(vehicle.brand, [Validators.required, Validators.minLength(2)]),
            'model': new FormControl(vehicle.model, [Validators.required, Validators.minLength(2)]),
            'type': new FormControl(vehicle.getType(), Validators.required),
            'cubicCapacity': new FormControl(vehicle.cubicCapacity.toString(), [Validators.required, Validators.pattern('^[0-9]*$')]),
            'horsePower': new FormControl(vehicle.horsePower.toString(), [Validators.required, Validators.pattern('^[0-9]*$')]),
            'yearOfProduction': new FormControl(vehicle.yearOfProduction.toString(), [Validators.required, Validators.pattern('^[0-9]*$')]),
            'kilometer': new FormControl(vehicle.kilometer.toString(), [Validators.required, Validators.pattern('^[0-9]*$')]),
            'seat': new FormControl(vehicle.numberOfSeats.toString(), Validators.required)
          });
        });
        break;
    }
  }

  onSubmit(){
    let companyId = this.route.snapshot['_routerState'].url.split('/')[3];
    
    let racCompany = this.racCompaniesService.getRacCompany(companyId);
    
    let type = this.addVehicle.get('type').value;

    let vehicle = new Vehicle(this.addVehicle.get('brand').value,
    this.addVehicle.get('model').value,
    +Type[type],
    +this.addVehicle.get('cubicCapacity').value,
    +this.addVehicle.get('horsePower').value,
    +this.addVehicle.get('yearOfProduction').value,
    +this.addVehicle.get('kilometer').value,
    +this.addVehicle.get('seat').value, 
    racCompany);

    if(this.edit){
      racCompany.editVehicle(this.id, vehicle);
      this.router.navigate(['../../'], { relativeTo: this.route});
    }
    else{
      racCompany.addVehicle(vehicle);
      this.router.navigate(['../'], { relativeTo: this.route});
    }
  }
}
