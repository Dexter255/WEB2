import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
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
          'seat': new FormControl(null, Validators.required),
          'freeFrom': new FormControl(null, [Validators.required, this.compareDates, this.checkDate]),
          'freeTo': new FormControl(null, [Validators.required, this.compareDates, this.checkDate])
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
            'seat': new FormControl(vehicle.numberOfSeats.toString(), Validators.required),
            'freeDates': new FormArray([])
          });

          vehicle.freeDates.forEach(element => {
            let date = this.formatDate(element);
            this.onAddDate(date);
          });
        });
        break;
    }
  }

  compareDates(control: FormControl): {[error: string]: boolean}{
    let free: string[];
    let to: string[];
    try{
      let freeFrom = control.parent.get('freeFrom').value;
      let freeTo = control.parent.get('freeTo').value;

      if(freeFrom !== null && freeTo !== null){
        let freeFromDate = new Date(freeFrom);
        let freeToDate = new Date(freeTo)        
        
        if(freeFromDate > freeToDate)
          return {'notValid': true};
        
        return null;
      }
    }
    catch(Error){

    }

    return null;
  }
    
  checkDate(control: FormControl): {[error: string]: boolean}{
    let currentDate = new Date();
    
    try{
      let freeDate = control.value;

      if(freeDate !== null ){      
        let date = new Date(freeDate);

        if(new Date(date.toDateString()) < new Date(currentDate.toDateString()))
          return {'currentDate': true};
        
        return null;
      }
    }
    catch(Error){

    }
    
    return null;
  }
  
  formatDate(date: Date): string{
    let month: string = date.getMonth() < 10 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
    let day: string = date.getDate() < 10 ? '0' + date.getDate().toString() : date.getDate().toString();

    return date.getFullYear() + '-' + month + '-' + day;
  }
    
  onAddDate(freeDate: string = null){
    let date = new FormControl(freeDate, Validators.required);

    (<FormArray>this.addVehicle.get('freeDates')).push(date);
  }
  
  onDeleteDate(index: number){
    (<FormArray>this.addVehicle.get('freeDates')).removeAt(index);
  }
  
  onSubmit(){
    let racCompany = this.racCompanyService.getRacCompany(this.companyId);
    
    let type = this.addVehicle.get('type').value;

    if(this.edit){
      let freeDates: Date[] = [];

      this.addVehicle.get('freeDates').value.forEach(element => {
        freeDates.push(new Date(element));
      });
            
      racCompany.editVehicle(this.vehicleId,
        this.addVehicle.get('brand').value,
        this.addVehicle.get('model').value,
        +Type[type],
        +this.addVehicle.get('cubicCapacity').value,
        +this.addVehicle.get('horsePower').value,
        +this.addVehicle.get('yearOfProduction').value,
        +this.addVehicle.get('kilometer').value,
        +this.addVehicle.get('seat').value,
        freeDates);
      this.router.navigate(['../../'], { relativeTo: this.route});
    }
    else{
      let freeDates: Date[] = [];

      let freeFromDate = new Date(this.addVehicle.get('freeFrom').value);
      let freeToDate = new Date(this.addVehicle.get('freeTo').value);
      
      while(freeFromDate <= freeToDate){
        freeDates.push(new Date(freeFromDate.toDateString()));
        freeFromDate.setDate(freeFromDate.getDate() + 1);
      }
      
      racCompany.addVehicle(this.addVehicle.get('brand').value,
      this.addVehicle.get('model').value,
      +Type[type],
      +this.addVehicle.get('cubicCapacity').value,
      +this.addVehicle.get('horsePower').value,
      +this.addVehicle.get('yearOfProduction').value,
      +this.addVehicle.get('kilometer').value,
      +this.addVehicle.get('seat').value,
      freeDates);
      this.router.navigate(['../'], { relativeTo: this.route});
    }
  }
}
