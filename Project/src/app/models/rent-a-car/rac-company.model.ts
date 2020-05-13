import { Service } from './service.model';
import { Vehicle } from './vehicle.model';
import { Type } from './type.model';

export class RentACarCompany {
    public id: number;
    private static nextId: number = 0;
    public companyName: string;
    public address: string;
    public description: string;
    public rating: number;
    public services: Service[];
    public vehicles: Vehicle[];
    public branches: string[];

    constructor(companyName: string, address: string, description: string, services: Service[], branches: string[], vehicles: Vehicle[] = []) {
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
        horsePower: number, yearOfProduction: number, kilometer: number, seat: number, freeDates: Date[]) {
        this.vehicles.push(new Vehicle(brand, model, type, cubicCapacity, horsePower, yearOfProduction, kilometer, seat, this,
            freeDates.sort((a, b) => {
                if (a < b)
                    return -1;
                else if (a > b)
                    return 1;

                return 0;
            })));
    }

    editVehicle(vehicleId: number, brand: string, model: string, type: Type, cubicCapacity: number,
        horsePower: number, yearOfProduction: number, kilometer: number, seat: number, freeDates: Date[]) {
        let vehicle = this.vehicles.find(x => x.id === vehicleId);
        vehicle.brand = brand;
        vehicle.model = model;
        vehicle.type = type;
        vehicle.cubicCapacity = cubicCapacity;
        vehicle.horsePower = horsePower;
        vehicle.yearOfProduction = yearOfProduction;
        vehicle.kilometer = kilometer;
        vehicle.numberOfSeats = seat;
        vehicle.freeDates = freeDates.sort((a, b) => {
            if (a < b)
                return -1;
            else if (a > b)
                return 1;

            return 0;
        });
    }
}