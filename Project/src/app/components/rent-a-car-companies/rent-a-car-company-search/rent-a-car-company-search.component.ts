import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RentACarCompanySearch } from 'src/app/models/rent-a-car/rac-company-search.model';

@Component({
  selector: 'app-rent-a-car-company-search',
  templateUrl: './rent-a-car-company-search.component.html',
  styleUrls: ['./rent-a-car-company-search.component.css']
})
export class RentACarCompanySearchComponent implements OnInit {
  searchRacCompany: FormGroup;
  @Output() search = new EventEmitter<RentACarCompanySearch>();
  @Output() reset = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
    this.searchRacCompany = new FormGroup({
      'companyName': new FormControl(null),
      'address': new FormControl(null),
      'fromDate': new FormControl(null),
      'toDate': new FormControl(null)
    })
  }

  onSearch(){
    let companyName = this.searchRacCompany.get('companyName').value;
    let address = this.searchRacCompany.get('address').value;
    let fromDate = this.searchRacCompany.get('fromDate').value;
    let toDate = this.searchRacCompany.get('toDate').value;

    if(companyName !== null || address !== null || fromDate !== null || toDate !== null)
      this.search.emit(new RentACarCompanySearch(0, companyName, address, fromDate, toDate, []));
  }

  onReset(){
    this.searchRacCompany.setValue({
      'companyName': null,
      'address': null,
      'fromDate': null,
      'toDate': null
    })
    this.reset.emit();
  }
}