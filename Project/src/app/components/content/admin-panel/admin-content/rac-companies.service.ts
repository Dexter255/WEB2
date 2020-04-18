import { RentACarCompany } from 'src/app/models/rent-a-car/rac-company.model';
import { Address } from 'src/app/models/rent-a-car/address.model';
import { Service } from 'src/app/models/rent-a-car/service.model';

export class RacCompaniesService{
    public racCompanies: RentACarCompany[];

    constructor(){
        this.racCompanies = [];

        let address = new Address("Serbia", "Sremska Mitrovica", "Ratarska", 32, 22000);

        var services: Service[] = [];
        services.push(new Service("Iznajmljivanje vozila", 200));
        services.push(new Service("Prodaja vozila", 200));

        var branches: Address[] = [];
        branches.push(new Address("Serbia", "Beograd", "Knez Mihajla", 25, 22000));

        let racCompany1 = new RentACarCompany("Kompanija1", address, "Opis Kompanije1", services, branches);
        let racCompany2 = new RentACarCompany("Kompanija2", address, "Opis Kompanije2", services, branches);
        let racCompany3 = new RentACarCompany("Kompanija3", address, "Opis Kompanije3", services, branches);
        
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

    deleteRacCompany(index: number){
        this.racCompanies.splice(index, 1);
    }
}