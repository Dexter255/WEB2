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

    constructor(id: number, companyName: string, address: string, description: string, services: Service[], 
        branches: Branch[], vehicles: Vehicle[] = [], rating: number) {
        this.Id = id;
        this.CompanyName = companyName;
        this.Address = address;
        this.Description = description;
        this.Services = services;
        this.Vehicles = vehicles;
        this.Branches = branches;
        this.Rating = rating;
    }
}