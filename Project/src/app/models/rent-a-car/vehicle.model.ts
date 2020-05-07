import { Type } from './type.model';
import { RentACarCompany } from './rac-company.model';

export class Vehicle {
    public brand: string;
    public model: string;
    public type: Type;
    public cubicCapacity: number;
    public horsePower: number;
    public yearOfProduction: number;
    public kilometer: number;
    public numberOfSeats: number;
    public rating: number;
    // dodato
    public belongsToCompany: RentACarCompany;

    constructor(brand: string, model: string, type: Type, cubicCapacity: number, horsePower: number, yearOfProduction: number,
        kilometer: number, numberOfSeats: number, belongsToCompany: RentACarCompany) {
        this.brand = brand;
        this.model = model;
        this.type = type;
        this.cubicCapacity = cubicCapacity;
        this.horsePower = horsePower;
        this.yearOfProduction = yearOfProduction;
        this.kilometer = kilometer;
        this.numberOfSeats = numberOfSeats;
        this.belongsToCompany = belongsToCompany;
        this.rating = 0;
    }

    getType(){
        return Type[this.type];
    }

    public toString = () : string => {
        return this.brand + " " + this.model + ", " + this.getType();
    }
}