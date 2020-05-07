import { Vehicle } from 'src/app/models/rent-a-car/vehicle.model';
import { Service } from 'src/app/models/rent-a-car/service.model';
import { RentACarCompany } from 'src/app/models/rent-a-car/rac-company.model';
import { Type } from 'src/app/models/rent-a-car/type.model';

export class RentACarService {
    private vehicles: Vehicle[];

    constructor() {
        this.vehicles = [];

        let address = "Serbia, Beograd, Knez Mihajla 25, 22000";

        var services: Service[] = [];
        services.push(new Service("Iznajmljivanje vozila", 200));
        services.push(new Service("Prodaja vozila", 200));

        var branches: string[] = [];
        branches.push("Serbia, Beograd, Knez Mihajla 25, 22000");

        let racCompany = new RentACarCompany("Kompanija1", address, "Opis Kompanije1", services, branches);

        let vehicle1 = new Vehicle("AUDI", "A4", Type.Caravan, 1900, 140, 2012, 130000, 5, racCompany);
        let vehicle2 = new Vehicle("BMW", "M5", Type.Saloon, 2000, 130, 2010, 150000, 4, racCompany);
        let vehicle3 = new Vehicle("Opel", "Corsa", Type.Hatchback, 1700, 70, 2002, 205000, 3, racCompany);

        this.vehicles.push(vehicle1);
        this.vehicles.push(vehicle2);
        this.vehicles.push(vehicle3);
        
        racCompany.addVehicle(vehicle1);
        racCompany.addVehicle(vehicle2);
        racCompany.addVehicle(vehicle3);
    }

    getVehicles(){
        return this.vehicles.slice();
    }

    getVehicle(index: number){
        return this.vehicles[index];
    }
}