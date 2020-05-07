import { Service } from './service.model';
import { Vehicle } from './vehicle.model';
//import { Vehicle } from './vehicle.model';

export class RentACarCompany{
    public companyName: string;
    public address: string;
    public description: string;
    public rating: number;
    public services: Service[];
    public vehicles: Vehicle[];
    public branches: string[];

    constructor(companyName: string, address: string, description: string, services: Service[], branches: string[], vehicles: Vehicle[] = []){
        this.companyName = companyName;
        this.address = address;
        this.description = description;
        this.rating = 0;
        this.services = services;
        this.vehicles = vehicles;
        this.branches = branches;
    }

    addVehicle(vehicle: Vehicle){
        this.vehicles.push(vehicle);
    }

    editVehicle(index: number, vehicle: Vehicle){
        this.vehicles[index] = vehicle;
    }
}