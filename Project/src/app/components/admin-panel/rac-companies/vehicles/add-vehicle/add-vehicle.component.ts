import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RacCompanyService } from 'src/app/components/rac-company.service';
import { Vehicle } from 'src/app/models/rent-a-car/vehicle.model';
import { Type } from 'src/app/models/rent-a-car/type.model';

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
  vehicleId: number;
  companyId: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private racCompanyService: RacCompanyService) { }

  ngOnInit(): void {
    switch(this.route.snapshot['_routerState'].url.split('/')[5]){
      case 'add':
        this.companyId = +this.route.snapshot['_routerState'].url.split('/')[3];
        
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
          this.vehicleId = +params['id'];
          this.companyId = +this.route.snapshot['_routerState'].url.split('/')[3];
          
          let vehicle = this.racCompanyService.getVehicle(this.companyId, this.vehicleId)
          
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
    let racCompany = this.racCompanyService.getRacCompany(this.companyId);
    
    let type = this.addVehicle.get('type').value;

    if(this.edit){
      racCompany.editVehicle(this.vehicleId,
        this.addVehicle.get('brand').value,
        this.addVehicle.get('model').value,
        +Type[type],
        +this.addVehicle.get('cubicCapacity').value,
        +this.addVehicle.get('horsePower').value,
        +this.addVehicle.get('yearOfProduction').value,
        +this.addVehicle.get('kilometer').value,
        +this.addVehicle.get('seat').value);
      this.router.navigate(['../../'], { relativeTo: this.route});
    }
    else{
      racCompany.addVehicle(this.addVehicle.get('brand').value,
      this.addVehicle.get('model').value,
      +Type[type],
      +this.addVehicle.get('cubicCapacity').value,
      +this.addVehicle.get('horsePower').value,
      +this.addVehicle.get('yearOfProduction').value,
      +this.addVehicle.get('kilometer').value,
      +this.addVehicle.get('seat').value);
      this.router.navigate(['../'], { relativeTo: this.route});
    }
  }
}
