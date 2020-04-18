import { Component, OnInit } from '@angular/core';
import { RacCompaniesService } from '../admin-panel/admin-content/rac-companies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AirlinesService } from '../admin-panel/admin-content/airlines.service';
import { AdminsService } from '../admin-panel/admin-content/admins.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  dataArray: any[];
  columns: string[];  // property-i koji se zele prikazati u tabeli
  properties: string[]  // property-i koji se zele prikazati u tabeli
  nameOfService: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private racCompaniesService: RacCompaniesService,
    private airlinesService: AirlinesService,
    private adminsService: AdminsService) { }

  ngOnInit(): void {
    let putanja = this.route.snapshot.url[0].path;

    switch (putanja) {
      case 'rac-companies':
        this.dataArray = this.racCompaniesService.getRacCompanies();
        this.properties = ['companyName', 'address', 'description', 'rating'];  // mora odgovarati nazivu property-a klase
        this.columns = ['Company name', 'Address', 'Description', 'Rating'];
        this.nameOfService = 'racCompaniesService';
        break;

      case 'airlines':
        this.dataArray = this.airlinesService.getAirlines();
        this.properties = ['name', 'name', 'name', 'name'];  // mora odgovarati nazivu property-a klase
        this.columns = ['Company name', 'Address', 'Description', 'Rating'];
        this.nameOfService = 'airlinesService';
        break;

      case 'rac-companies-admins':
        this.dataArray = this.adminsService.getRentACarCompaniesAdmins();
        this.properties = ['ime', 'prezime', 'email', 'adresa', 'telefon'];  // mora odgovarati nazivu property-a klase
        this.columns = ['Name', 'Lastname', 'Email', 'Address', 'Number'];
        this.nameOfService = 'RentACarAdminsService';
        break;

      case 'airlines-admins':
        this.dataArray = this.adminsService.getAirlinesAdmins();
        this.properties = ['ime', 'prezime', 'email', 'adresa', 'telefon'];  // mora odgovarati nazivu property-a klase
        this.columns = ['Name', 'Lastname', 'Email', 'Address', 'Number'];
        this.nameOfService = 'AirlinesAdminsService';
        break;
    }
  }

  onDelete(index: number) {
    switch (this.nameOfService) {
      case 'racCompaniesService':
        this.racCompaniesService.deleteRacCompany(index);
        break;

      case 'airlinesService':
        this.airlinesService.deleteAirline(index);
        break;

      case 'RentACarAdminsService':
        this.adminsService.deleteRentACarCompanyAdmin(index);
        break;

      case 'AirlinesAdminsService':
        this.adminsService.deleteAirlineAdmin(index);
        break;
    }
  }

  onAddElement(){
    let putanja = this.route.snapshot.url[0].path;

    switch(putanja){
      case 'rac-companies':
        this.router.navigate(['../', 'add-rac-company'], {relativeTo: this.route})
        break;

      case 'airlines':
        this.router.navigate(['../', 'add-airline'], {relativeTo: this.route})
        break;

      case 'rac-companies-admins':
        this.router.navigate(['../', 'add-rac-companies-admin'], {relativeTo: this.route})
        break;

      case 'airlines-admins':
        this.router.navigate(['../', 'add-airlines-admin'], {relativeTo: this.route})
        break;
    }
  }
}