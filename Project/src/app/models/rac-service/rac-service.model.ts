import { Address } from './address.model';
import { Service } from './service.model';
import { Vehicle } from './vehicle.model';

export class RacService{
    public companyName: string;
    public address: Address;
    public description: string;
    public rating: number;
    public services: Service[];
    public vehicles: Vehicle[];
    public branches: Address[];

    constructor(companyName: string, address: Address, description: string, rating: number, services: Service[], vehicles: Vehicle[], branches: Address[]){
        this.companyName = companyName;
        this.address = address;
        this.description = description;
        this.rating = rating;
        this.services = services;
        this.vehicles = vehicles;
        this.branches = branches;
    }
}