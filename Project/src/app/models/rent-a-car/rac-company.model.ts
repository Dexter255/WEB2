import { Service } from './service.model';
import { Vehicle } from './vehicle.model';
import { Branch } from './branch.model';

export class RentACarCompany {
    public Id: number;
    public CompanyName: string;
    public Address: string;
    public Description: string;
    public Rating: number;
    public Services: Service[];
    public Vehicles: Vehicle[];
    public Branches: Branch[];

    constructor(id: number, companyName: string, address: string, description: string, services: Service[], branches: Branch[], vehicles: Vehicle[] = []) {
        this.Id = id;
        this.CompanyName = companyName;
        this.Address = address;
        this.Description = description;
        this.Rating = 0;
        this.Services = services;
        this.Vehicles = vehicles;
        this.Branches = branches;
    }

    // addVehicle(brand: string, model: string, type: Type, cubicCapacity: number,
    //     horsePower: number, yearOfProduction: number, kilometer: number, seat: number, freeDates: Date[]) {
    //     this.Vehicles.push(new Vehicle(0, brand, model, type, cubicCapacity, horsePower, yearOfProduction, kilometer, seat, this,
    //         freeDates.sort((a, b) => {
    //             if (a < b)
    //                 return -1;
    //             else if (a > b)
    //                 return 1;

    //             return 0;
    //         })));
    // }

    // editVehicle(vehicleId: number, brand: string, model: string, type: Type, cubicCapacity: number,
    //     horsePower: number, yearOfProduction: number, kilometer: number, seat: number, freeDates: Date[]) {
    //     let vehicle = this.Vehicles.find(x => x.id === vehicleId);
    //     vehicle.brand = brand;
    //     vehicle.model = model;
    //     vehicle.type = type;
    //     vehicle.cubicCapacity = cubicCapacity;
    //     vehicle.horsePower = horsePower;
    //     vehicle.yearOfProduction = yearOfProduction;
    //     vehicle.kilometer = kilometer;
    //     vehicle.numberOfSeats = seat;
    //     vehicle.freeDates = freeDates.sort((a, b) => {
    //         if (a < b)
    //             return -1;
    //         else if (a > b)
    //             return 1;

    //         return 0;
    //     });
    // }
}