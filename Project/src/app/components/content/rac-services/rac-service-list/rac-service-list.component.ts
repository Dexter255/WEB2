import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RacService } from 'src/app/models/rac-service/rac-service.model';
import { Address } from 'src/app/models/rac-service/address.model';
import { Service } from 'src/app/models/rac-service/service.model';
import { Vehicle } from 'src/app/models/rac-service/vehicle.model';

@Component({
  selector: 'app-rac-service-list',
  templateUrl: './rac-service-list.component.html',
  styleUrls: ['./rac-service-list.component.css']
})
export class RacServiceListComponent implements OnInit {
  public racServices: RacService[];
  @Output() onSelectedServiceFromList = new EventEmitter<RacService>();

  constructor() {
    this.racServices = [];
    let address = new Address("Serbia", "Sremska Mitrovica", "Ratarska", 32, 22000);

    var services: Service[] = [];
    services.push(new Service("Iznajmljivanje vozila", 200));
    services.push(new Service("Prodaja vozila", 200));

    var vehicles: Vehicle[] = [];
    vehicles.push(new Vehicle("Audi", "A4", 2014, 5, 5));
    vehicles.push(new Vehicle("BMW", "M5", 2012, 5, 4));

    var branches: Address[] = [];
    branches.push(new Address("Serbia", "Beograd", "Knez Mihajla", 25, 22000));

    // let rs1 = new RacService("Kompanija1", address, "Opis Kompanije1", 1, services, vehicles, branches);
    // let rs2 = new RacService("Kompanija2", address, "Opis Kompanije2", 2, services, vehicles, branches);
    // let rs3 = new RacService("Kompanija3", address, "Opis Kompanije3", 3, services, vehicles, branches);

    this.racServices.push(new RacService("Kompanija1", address, "Opis Kompanije1", 1, services, vehicles, branches));
    this.racServices.push(new RacService("Kompanija2", address, "Opis Kompanije2", 2, services, vehicles, branches));
    this.racServices.push(new RacService("Kompanija3", address, "Opis Kompanije3", 3, services, vehicles, branches));
   }

  ngOnInit(): void {
  }

  onSelectedService(racService: RacService){
    this.onSelectedServiceFromList.emit(racService);
  }
}
