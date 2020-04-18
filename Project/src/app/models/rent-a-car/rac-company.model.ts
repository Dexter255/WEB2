import { Address } from './address.model';
import { Service } from './service.model';
//import { Vehicle } from './vehicle.model';

export class RentACarCompany{
    public companyName: string;
    public address: Address;
    public description: string;
    public rating: number;
    public services: Service[];
    //public vehicles: Vehicle[];
    public branches: Address[];

    constructor(companyName: string, address: Address, description: string, services: Service[], /*vehicles: Vehicle[],*/ branches: Address[]){
        this.companyName = companyName;
        this.address = address;
        this.description = description;
        this.rating = 0;
        this.services = services;
        //this.vehicles = vehicles;
        this.branches = branches;
    }
}