import { Service } from './service.model';
import { Vehicle } from './vehicle.model';
import { Type } from './type.model';
//import { Vehicle } from './vehicle.model';

export class RentACarCompany{
    public id: number;
    private static nextId: number = 0;
    public companyName: string;
    public address: string;
    public description: string;
    public rating: number;
    public services: Service[];
    public vehicles: Vehicle[];
    public branches: string[];

    constructor(companyName: string, address: string, description: string, services: Service[], branches: string[], vehicles: Vehicle[] = []){
        this.id = RentACarCompany.nextId++;
        this.companyName = companyName;
        this.address = address;
        this.description = description;
        this.rating = 0;
        this.services = services;
        this.vehicles = vehicles;
        this.branches = branches;
    }

    addVehicle(brand: string, model: string, type: Type, cubicCapacity: number, 
        horsePower: number, yearOfProduction: number, kilometer: number, seat: number){
            this.vehicles.push(new Vehicle(brand, model, type, cubicCapacity, horsePower, yearOfProduction, kilometer, seat, this));
    }

    editVehicle(vehicleId: number, brand: string, model: string, type: Type, cubicCapacity: number, 
        horsePower: number, yearOfProduction: number, kilometer: number, seat: number){
            let vehicle = this.vehicles.find(x => x.id === vehicleId);
            vehicle.brand = brand;
            vehicle.model = model;
            vehicle.type = type;
            vehicle.cubicCapacity = cubicCapacity;
            vehicle.horsePower = horsePower;
            vehicle.yearOfProduction = yearOfProduction;
            vehicle.kilometer = kilometer;
            vehicle.numberOfSeats = seat;
    }
}