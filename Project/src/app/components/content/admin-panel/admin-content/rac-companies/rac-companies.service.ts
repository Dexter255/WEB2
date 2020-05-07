import { RentACarCompany } from 'src/app/models/rent-a-car/rac-company.model';
import { Service } from 'src/app/models/rent-a-car/service.model';
import { Vehicle } from 'src/app/models/rent-a-car/vehicle.model';
import { Type } from 'src/app/models/rent-a-car/type.model';

export class RacCompaniesService{
    public racCompanies: RentACarCompany[];

    constructor(){
        this.racCompanies = [];

        let address = "Serbia, Sremska Mitrovica, Ratarska 32, 22000";

        var services: Service[] = [];
        services.push(new Service("Iznajmljivanje vozila", 200));
        services.push(new Service("Prodaja vozila", 200));

        var branches: string[] = [];
        branches.push("Serbia, Sremska Mitrovica, Ratarska 32, 22000");

        let racCompany1 = new RentACarCompany("Kompanija1", address, "Opis Kompanije1", services, branches);
        let racCompany2 = new RentACarCompany("Kompanija2", address, "Opis Kompanije2", services, branches);
        let racCompany3 = new RentACarCompany("Kompanija3", address, "Opis Kompanije3", services, branches);

        let vehicle1 = new Vehicle("AUDI", "A4", Type.Caravan, 1900, 140, 2012, 130000, 5, racCompany1);
        let vehicle2 = new Vehicle("BMW", "M5", Type.Saloon, 2000, 130, 2010, 150000, 4, racCompany2);
        let vehicle3 = new Vehicle("Opel", "Corsa", Type.Hatchback, 1700, 70, 2002, 205000, 3, racCompany3);  
        let vehicle4 = new Vehicle("Audi", "RS4", Type.Caravan, 3000, 420, 2019, 10000, 5, racCompany1);  
              
        racCompany1.addVehicle(vehicle1);
        racCompany1.addVehicle(vehicle4);
        racCompany2.addVehicle(vehicle2);
        racCompany3.addVehicle(vehicle3);
        
        this.racCompanies.push(racCompany1);
        this.racCompanies.push(racCompany2);
        this.racCompanies.push(racCompany3);
    }

    getRacCompanies(){
        return this.racCompanies;
    }

    getRacCompany(index: number){
        return this.racCompanies[index];
    }

    addRacCompany(racCompany: RentACarCompany){
        this.racCompanies.push(racCompany);
    }
    
    updateRacCompany(index: number, racCompany: RentACarCompany){
        racCompany.vehicles = this.racCompanies[index].vehicles;
        this.racCompanies[index] = racCompany;
    }
    
    deleteRacCompany(index: number){
        this.racCompanies.splice(index, 1);
    }

    getVehicles(companyId: number){
        return this.racCompanies[companyId].vehicles;
    }

    deleteVehicle(companyName: string, index: number){
        this.racCompanies.find(company => company.companyName == companyName).vehicles.splice(index, 1);
    }

    getVehicle(companyId: number, vehicleId: number){
        return this.racCompanies[companyId].vehicles[vehicleId];
    }
}