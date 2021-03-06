import { RentACarCompany } from './rac-company.model';
import { VehicleType } from './vehicle-type.model';
import { FreeDate } from './free-date.model';

export class Vehicle {
    public Id: number;
    public Brand: string;
    public Model: string;
    public Type: VehicleType;
    public CubicCapacity: number;
    public HorsePower: number;
    public YearOfProduction: number;
    public Kilometers: number;
    public NumberOfSeats: number;
    public Rating: number;
    public FreeDates: FreeDate[];
    public Reserved: number;
    public PricePerDay: number;
    public RatedCount: number;

    constructor(id: number, brand: string, model: string, type: VehicleType, cubicCapacity: number, horsePower: number, yearOfProduction: number,
        kilometers: number, numberOfSeats: number, freeDates: FreeDate[], pricePerDay: number, rating: number, ratedCount: number) {
        this.Id = id;
        this.Brand = brand;
        this.Model = model;
        this.Type = type;
        this.CubicCapacity = cubicCapacity;
        this.HorsePower = horsePower;
        this.YearOfProduction = yearOfProduction;
        this.Kilometers = kilometers;
        this.NumberOfSeats = numberOfSeats;
        this.FreeDates = freeDates;
        this.PricePerDay = pricePerDay;
        this.Rating = rating;
        this.RatedCount = ratedCount;
    }
}