import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RentACarCompany } from 'src/app/models/rent-a-car/rac-company.model';
import { Service } from 'src/app/models/rent-a-car/service.model';
import { RacCompaniesService } from '../rac-companies.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-add-rac-company',
  templateUrl: './add-rac-company.component.html',
  styleUrls: ['./add-rac-company.component.css']
})
export class AddRacCompanyComponent implements OnInit {
  addRacCompany: FormGroup;
  edit: boolean = false;
  header: string = 'Add rent a car company';
  id: number;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private racCompaniesService: RacCompaniesService) { }

  ngOnInit(): void {
    switch (this.route.snapshot['_routerState'].url.split('/')[3]) {
      case 'add':
        this.addRacCompany = new FormGroup({
          'companyName': new FormControl(null, [Validators.required, Validators.minLength(4)]),
          'address': new FormControl(null, [Validators.required, Validators.minLength(4)]),
          'description': new FormControl(null, [Validators.required, Validators.minLength(4)]),
          'services': new FormArray([]),
          'branches': new FormArray([])
        });
        break;

      case 'edit':
        this.route.params.subscribe((params: Params) => {
          this.edit = true;
          this.header = "Edit rent a car company";
          this.id = +params['id'];

          let racCompany = this.racCompaniesService.getRacCompany(this.id);
                    
          this.addRacCompany = new FormGroup({
            'companyName': new FormControl(racCompany.companyName, [Validators.required, Validators.minLength(4)]),
            'address': new FormControl(racCompany.address, [Validators.required, Validators.minLength(4)]),
            'description': new FormControl(racCompany.description, [Validators.required, Validators.minLength(4)]),
            'services': new FormArray([]),
            'branches': new FormArray([])
          });
          
          racCompany.services.forEach(element => {
            this.onAddService(element.description, element.price.toString());
          });

          racCompany.branches.forEach(element => {
            this.onAddBranch(element);
          });
          
        });
        break;
    }
  }

  onAddService(service: string = null, price: string = null){
    let s = new FormGroup({
      'description': new FormControl(service, [Validators.required, Validators.minLength(4)]),
      'price': new FormControl(price, [Validators.required, Validators.pattern('^[0-9]*$')])
    });
    
    (<FormArray>this.addRacCompany.get('services')).push(s);
  }
  
  onDeleteService(index: number){
    (<FormArray>this.addRacCompany.get('services')).removeAt(index);
  }

  onAddBranch(address: string = null){
    let branch = new FormControl(address, [Validators.required, Validators.minLength(4)]);

    (<FormArray>this.addRacCompany.get('branches')).push(branch);
  }

  onDeleteBranch(index: number){
    (<FormArray>this.addRacCompany.get('branches')).removeAt(index);
  }

  onSubmit(){
    let services: Service[] = [];
    let branches: string[] = [];

    this.addRacCompany.get('services').value.forEach(element => {
      services.push(new Service(element.description, +element.price));
    });

    this.addRacCompany.get('branches').value.forEach(element => {
      branches.push(element);
    });

    let racCompany = new RentACarCompany(this.addRacCompany.get('companyName').value,
                                          this.addRacCompany.get('address').value,
                                          this.addRacCompany.get('description').value,
                                          services,
                                          branches);

    if(this.edit)
      this.racCompaniesService.updateRacCompany(this.id, racCompany);
    else
      this.racCompaniesService.addRacCompany(racCompany);

    if (this.edit)
      this.router.navigate(['../../'], { relativeTo: this.route });
    else
      this.router.navigate(['../'], { relativeTo: this.route });

  }
}
