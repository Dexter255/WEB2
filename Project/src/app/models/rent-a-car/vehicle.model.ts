import { Type } from './type.model';
import { RentACarCompany } from './rac-company.model';

export class Vehicle {
    public id: number;
    private static nextId: number = 0;
    public brand: string;
    public model: string;
    public type: Type;
    public cubicCapacity: number;
    public horsePower: number;
    public yearOfProduction: number;
    public kilometer: number;
    public numberOfSeats: number;
    public rating: number;
    public freeDates: Date[];
    // dodato
    public belongsToCompany: RentACarCompany;
    public reserved: boolean;

    constructor(brand: string, model: string, type: Type, cubicCapacity: number, horsePower: number, yearOfProduction: number,
        kilometer: number, numberOfSeats: number, belongsToCompany: RentACarCompany, freeDates: Date[] = null) {
        this.id = Vehicle.nextId++;
        this.brand = brand;
        this.model = model;
        this.type = type;
        this.cubicCapacity = cubicCapacity;
        this.horsePower = horsePower;
        this.yearOfProduction = yearOfProduction;
        this.kilometer = kilometer;
        this.numberOfSeats = numberOfSeats;
        this.rating = 0;
        this.freeDates = freeDates;
        this.belongsToCompany = belongsToCompany;
        this.reserved = false;
    }

    getType(){
        return Type[this.type];
    }

    public toString = () : string => {
        return this.brand + " " + this.model + ", " + this.getType();
    }
}