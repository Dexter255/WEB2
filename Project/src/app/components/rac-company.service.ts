import { RentACarCompany } from '../models/rent-a-car/rac-company.model';
import { Service } from '../models/rent-a-car/service.model';
import { Type } from '../models/rent-a-car/type.model';
import { Vehicle } from '../models/rent-a-car/vehicle.model';

export class RacCompanyService{
    private racCompanies: RentACarCompany[];

    constructor(){
        this.racCompanies = [];

        let address = "Serbia, Sremska Mitrovica, Ratarska 32, 22000";

        var services: Service[] = [];
        services.push(new Service("Iznajmljivanje vozila", 200));
        services.push(new Service("Prodaja vozila", 200));

        var branches: string[] = [];
        branches.push("Serbia, Sremska Mitrovica, Ratarska 32, 22000");

        let racCompany1 = new RentACarCompany("RACKompanija1", address, "Opis RACKompanije1", services, branches);
        let racCompany2 = new RentACarCompany("RACKompanija2", address, "Opis RACKompanije2", services, branches);
        let racCompany3 = new RentACarCompany("RACKompanija3", address, "Opis RACKompanije3", services, branches);
              
        racCompany1.addVehicle("AUDI", "A4", Type.Caravan, 1900, 140, 2012, 130000, 5);
        racCompany1.addVehicle("Audi", "RS4", Type.Caravan, 3000, 420, 2019, 10000, 5);
        racCompany2.addVehicle("Opel", "Corsa", Type.Hatchback, 1700, 70, 2002, 205000, 3);
        racCompany3.addVehicle("BMW", "M5", Type.Saloon, 2000, 130, 2010, 150000, 4);
        
        this.racCompanies.push(racCompany1);
        this.racCompanies.push(racCompany2);
        this.racCompanies.push(racCompany3);
    }

    checkRacCompanyId(id: number){
        for(let i = 0; i < this.racCompanies.length; i++){
            if(this.racCompanies[i].id === id)
                return true;
        }

        return false;
    }
    
    getRacCompanies(){
        return this.racCompanies;
    }

    getRacCompany(companyId: number){
        return this.racCompanies.find(x => x.id === companyId);
    }

    addRacCompany(companyName: string, address: string, description: string, services: Service[], branches: string[]){
        this.racCompanies.push(new RentACarCompany(companyName,
            address, description, services, branches));
    }
    
    updateRacCompany(companyId: number, companyName: string, address: string, description: string, services: Service[], branches: string[]){
        let racCompany = this.racCompanies.find(x => x.id === companyId);
        racCompany.companyName = companyName;
        racCompany.address = address;
        racCompany.description = description;
        racCompany.services = services;
        racCompany.branches = branches;
    }
    
    deleteRacCompany(companyId: number){
        let index = this.racCompanies.indexOf(this.racCompanies.find(x => x.id === companyId));
        this.racCompanies.splice(index, 1);
    }

    // vehicles
    checkVehicleId(vehicleId: number){
        for(let i = 0; i < this.racCompanies.length; i++){
            if(this.racCompanies[i].vehicles.find(x => x.id === vehicleId) !== undefined)
                return true;
        }

        return false;
    }

    getVehicles(companyId: number){
        return this.racCompanies.find(x => x.id === companyId).vehicles;
    }

    getVehicle(companyId: number, vehicleId: number){
        return this.racCompanies.find(x => x.id === companyId).vehicles.find(x => x.id === vehicleId);
    }

    deleteVehicle(companyId: number, vehicleId: number){
        let racCompany = this.racCompanies.find(x => x.id === companyId);
        let index = racCompany.vehicles.indexOf(racCompany.vehicles.find(x => x.id === vehicleId));
        racCompany.vehicles.splice(index, 1);
    }

}