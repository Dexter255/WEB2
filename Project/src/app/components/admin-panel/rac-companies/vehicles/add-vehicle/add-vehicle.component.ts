import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { RacCompanyService } from 'src/app/components/rac-company.service';
import { VehicleType } from 'src/app/models/rent-a-car/vehicle-type.model';
import { VehicleService } from 'src/app/components/vehicle.service';
import { Vehicle } from 'src/app/models/rent-a-car/vehicle.model';
import { FreeDate } from 'src/app/models/rent-a-car/free-date.model';
import { RentACarCompany } from 'src/app/models/rent-a-car/rac-company.model';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
  addVehicle: FormGroup;
  show: boolean = false;

  types: string[] = ['Cabriolet', 'Caravan', 'Saloon', 'Hatchback', 'Coupe', 'Miniven', 'SUV'];
  seats: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  header: string = 'Add vehicle';
  vehicleId: number;
  companyId: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private racCompanyService: RacCompanyService) { }

  ngOnInit(): void {
    switch (this.route.snapshot['_routerState'].url.split('/')[5]) {
      case 'add':
        this.companyId = +this.route.snapshot['_routerState'].url.split('/')[3];

        this.addVehicle = new FormGroup({
          'companyId': new FormControl(this.companyId),
          'vehicleId': new FormControl(0),
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
        this.show = true;
        break;

      case 'edit':
        this.route.params.subscribe((params: Params) => {
          this.header = "Edit admin";
          this.vehicleId = +params['id'];
          this.companyId = +this.route.snapshot['_routerState'].url.split('/')[3];

          let vehicle;
          this.vehicleService.getVehicle(this.companyId, this.vehicleId).subscribe(
            res => {
              vehicle = res as Vehicle;

              this.addVehicle = new FormGroup({
                'companyId': new FormControl(this.companyId),
                'vehicleId': new FormControl(this.vehicleId),
                'brand': new FormControl(vehicle.Brand, [Validators.required, Validators.minLength(2)]),
                'model': new FormControl(vehicle.Model, [Validators.required, Validators.minLength(2)]),
                'type': new FormControl(vehicle.getType(), Validators.required),
                'cubicCapacity': new FormControl(vehicle.CubicCapacity.toString(), [Validators.required, Validators.pattern('^[0-9]*$')]),
                'horsePower': new FormControl(vehicle.HorsePower.toString(), [Validators.required, Validators.pattern('^[0-9]*$')]),
                'yearOfProduction': new FormControl(vehicle.YearOfProduction.toString(), [Validators.required, Validators.pattern('^[0-9]*$')]),
                'kilometer': new FormControl(vehicle.Kilometers.toString(), [Validators.required, Validators.pattern('^[0-9]*$')]),
                'seat': new FormControl(vehicle.NumberOfSeats.toString(), Validators.required),
                'freeDates': new FormArray([])
              });

              vehicle.FreeDates.forEach(element => {
                let date = this.formatDate(element.Date);
                this.onAddDate(date);
              });
              this.show = true;
            },
            err => {
              console.log(err);
            }
          )
        });
        break;
    }
  }

  compareDates(control: FormControl): { [error: string]: boolean } {
    let free: string[];
    let to: string[];
    try {
      let freeFrom = control.parent.get('freeFrom').value;
      let freeTo = control.parent.get('freeTo').value;

      if (freeFrom !== null && freeTo !== null) {
        let freeFromDate = new Date(freeFrom);
        let freeToDate = new Date(freeTo)

        if (freeFromDate > freeToDate)
          return { 'notValid': true };

        return null;
      }
    }
    catch (Error) {

    }

    return null;
  }

  checkDate(control: FormControl): { [error: string]: boolean } {
    let currentDate = new Date();

    try {
      let freeDate = control.value;

      if (freeDate !== null) {
        let date = new Date(freeDate);

        if (new Date(date.toDateString()) < new Date(currentDate.toDateString()))
          return { 'currentDate': true };

        return null;
      }
    }
    catch (Error) {

    }

    return null;
  }

  formatDate(date: Date): string {
    let month: string = date.getMonth() < 10 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
    let day: string = date.getDate() < 10 ? '0' + date.getDate().toString() : date.getDate().toString();

    return date.getFullYear() + '-' + month + '-' + day;
  }

  onAddDate(freeDate: string = null) {
    let date = new FormControl(freeDate, Validators.required);

    (<FormArray>this.addVehicle.get('freeDates')).push(date);
  }

  onDeleteDate(index: number) {
    (<FormArray>this.addVehicle.get('freeDates')).removeAt(index);
  }

  onSubmit() {
    this.racCompanyService.getRacCompany(this.addVehicle.get('companyId').value).subscribe(
      res => {
        let racCompany = res as RentACarCompany;


        let type = this.addVehicle.get('type').value;

        if (this.addVehicle.get('vehicleId').value !== 0) {
          let freeDates: FreeDate[] = [];

          this.addVehicle.get('freeDates').value.forEach(element => {
            freeDates.push(new FreeDate(0, new Date(element)));
          });

          let vehicle = new Vehicle(
            this.addVehicle.get('vehicleId').value,
            this.addVehicle.get('brand').value,
            this.addVehicle.get('model').value,
            +VehicleType[type],
            this.addVehicle.get('cubicCapacity').value,
            this.addVehicle.get('horsePower').value,
            this.addVehicle.get('yearOfProduction').value,
            this.addVehicle.get('kilometer').value,
            this.addVehicle.get('seat').value,
            racCompany,
            freeDates);

          this.vehicleService.updateVehicle(vehicle).subscribe(
            res => {
              // DATI OBAVESTENJE
            },
            err => {
              console.log(err);
            }
          );

          this.router.navigate(['../../'], { relativeTo: this.route });
        }
        else {
          let freeDates: FreeDate[] = [];

          let freeFromDate = new Date(this.addVehicle.get('freeFrom').value);
          let freeToDate = new Date(this.addVehicle.get('freeTo').value);

          while (freeFromDate <= freeToDate) {
            freeDates.push(new FreeDate(0, new Date(freeFromDate.toDateString())));
            freeFromDate.setDate(freeFromDate.getDate() + 1);
          }

          let vehicle = new Vehicle(
            this.addVehicle.get('vehicleId').value,
            this.addVehicle.get('brand').value,
            this.addVehicle.get('model').value,
            +VehicleType[type],
            this.addVehicle.get('cubicCapacity').value,
            this.addVehicle.get('horsePower').value,
            this.addVehicle.get('yearOfProduction').value,
            this.addVehicle.get('kilometer').value,
            this.addVehicle.get('seat').value,
            racCompany,
            freeDates);

          racCompany.Vehicles.push(vehicle);
          this.racCompanyService.updateRentACarCompany(racCompany).subscribe(
            res => {
              console.log(res);
            },
            err => {
              console.log(err);
            }
          )
          // this.vehicleService.addVehicle(vehicle).subscribe(
          //   res => {
          //     //DATI OBAVESTENJE
          //   },
          //   err => {
          //     console.log(err);
          //   }
          // );

          this.router.navigate(['../'], { relativeTo: this.route });
        }

      },
      err => {

      }
    )
  }
}
