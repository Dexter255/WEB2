import { RentACarCompany } from '../models/rent-a-car/rac-company.model';
import { Service } from '../models/rent-a-car/service.model';
import { Type } from '../models/rent-a-car/type.model';
import { RentACarCompanySearch } from '../models/rent-a-car/rac-company-search.model';
import { Vehicle } from '../models/rent-a-car/vehicle.model';

export class RacCompanyService {
    private racCompanies: RentACarCompany[];
    private racCompaniesSearch: RentACarCompanySearch[];

    constructor() {
        this.racCompanies = [];

        let address1 = "Serbia, Sremska Mitrovica, Ratarska 32, 22000";
        let address2 = "Serbia, Beograd";
        let address3 = "Serbia, Novi Sad";

        var services: Service[] = [];
        services.push(new Service("Iznajmljivanje vozila", 200));
        services.push(new Service("Prodaja vozila", 200));

        var branches: string[] = [];
        branches.push("Serbia, Sremska Mitrovica, Ratarska 32, 22000");

        let racCompany1 = new RentACarCompany("RACKompanija1", address1, "Opis RACKompanije1", services, branches);
        let racCompany2 = new RentACarCompany("RACKompanija2", address2, "Opis RACKompanije2", services, branches);
        let racCompany3 = new RentACarCompany("RACKompanija3", address3, "Opis RACKompanije3", services, branches);

        let freeDates1: Date[] = [];
        freeDates1.push(new Date(2020, 4, 27));
        freeDates1.push(new Date(2020, 4, 28));
        let freeDates2: Date[] = [];
        freeDates2.push(new Date(2020, 4, 29));
        freeDates2.push(new Date(2020, 4, 30));
        let freeDates3: Date[] = [];
        freeDates3.push(new Date(2020, 4, 31));
        freeDates3.push(new Date(2020, 5, 1));
        let freeDates4: Date[] = [];
        freeDates4.push(new Date(2020, 5, 2));
        freeDates4.push(new Date(2020, 5, 3));

        racCompany1.addVehicle("AUDI", "A4", Type.Caravan, 1900, 140, 2012, 130000, 5, freeDates1);
        racCompany1.addVehicle("Audi", "RS4", Type.Caravan, 3000, 420, 2019, 10000, 5, freeDates2);
        racCompany2.addVehicle("Opel", "Corsa", Type.Hatchback, 1700, 70, 2002, 205000, 3, freeDates3);
        racCompany3.addVehicle("BMW", "M5", Type.Saloon, 2000, 130, 2010, 150000, 4, freeDates4);

        this.racCompanies.push(racCompany1);
        this.racCompanies.push(racCompany2);
        this.racCompanies.push(racCompany3);
    }

    // companies
    checkRacCompanyId(companyId: number) {
        if(this.racCompanies.find(x => x.id === companyId) === undefined)
            return false;

        return true;
    }
    
    getRacCompanies() {
        return this.racCompanies;
    }
    
    setRacCompaniesSearch(){
        this.racCompaniesSearch = [];
        this.racCompanies.forEach(x => this.racCompaniesSearch.push(this.cloneRacCompany(x)));        
    }
    
    cloneRacCompany(racCompany: RentACarCompany): RentACarCompanySearch{
        let vehicles: Vehicle[] = [];
        racCompany.vehicles.forEach(x => vehicles.push(x));

        return new RentACarCompanySearch(racCompany.id, racCompany.companyName, racCompany.address, null, null, vehicles);
    }
    
    searchRacCompanies(racCompanySearch: RentACarCompanySearch){
        for (let i = 0; i < this.racCompaniesSearch.length; i++) {
            if (racCompanySearch.companyName !== null)
                this.racCompaniesSearch = this.racCompaniesSearch.filter(x => x.companyName.toLowerCase().includes(racCompanySearch.companyName.toLowerCase()));

            if(racCompanySearch.address !== null)
                this.racCompaniesSearch = this.racCompaniesSearch.filter(x => x.address.toLowerCase().includes(racCompanySearch.address.toLowerCase()));

            if(racCompanySearch.fromDate !== null && racCompanySearch.toDate !== null)
                this.racCompaniesSearch = this.racCompaniesSearch.filter(x => x.checkVehicleFreeDatesFromTo(racCompanySearch.fromDate, racCompanySearch.toDate) === true);
            else if(racCompanySearch.fromDate !== null)
                this.racCompaniesSearch = this.racCompaniesSearch.filter(x => x.checkVehicleFreeDatesFromOrTo(racCompanySearch.fromDate) === true);
            else if(racCompanySearch.toDate !== null)
                this.racCompaniesSearch = this.racCompaniesSearch.filter(x => x.checkVehicleFreeDatesFromOrTo(racCompanySearch.toDate) === true);
        }

        return this.racCompaniesSearch;
    }
    
    getRacCompany(companyId: number) {
        return this.racCompanies.find(x => x.id === companyId);
    }

    addRacCompany(companyName: string, address: string, description: string, services: Service[], branches: string[]) {
        this.racCompanies.push(new RentACarCompany(companyName,
            address, description, services, branches));
    }

    updateRacCompany(companyId: number, companyName: string, address: string, description: string, services: Service[], branches: string[]) {
        let racCompany = this.racCompanies.find(x => x.id === companyId);
        racCompany.companyName = companyName;
        racCompany.address = address;
        racCompany.description = description;
        racCompany.services = services;
        racCompany.branches = branches;
    }

    deleteRacCompany(companyId: number) {
        let index = this.racCompanies.indexOf(this.racCompanies.find(x => x.id === companyId));
        this.racCompanies.splice(index, 1);
    }

    // vehicles
    checkVehicleId(companyId: number, vehicleId: number) {
        if(this.racCompanies.find(x => x.id === companyId).vehicles.find(x => x.id === vehicleId) === undefined)
            return false

        return true;
    }

    getVehicles(companyId: number) {
        return this.racCompanies.find(x => x.id === companyId).vehicles;
    }

    getVehiclesSearch(companyId: number){
        return this.racCompaniesSearch.find(x => x.id === companyId).vehicles;
    }

    getVehicle(companyId: number, vehicleId: number) {
        return this.racCompanies.find(x => x.id === companyId).vehicles.find(x => x.id === vehicleId);
    }

    deleteVehicle(companyId: number, vehicleId: number) {
        let racCompany = this.racCompanies.find(x => x.id === companyId);
        let index = racCompany.vehicles.indexOf(racCompany.vehicles.find(x => x.id === vehicleId));
        racCompany.vehicles.splice(index, 1);
    }

    reserveVehicle(companyId: number, vehicleId: number){
        this.racCompanies.find(x => x.id === companyId).vehicles.find(x => x.id === vehicleId).reserved = true;
    }
}