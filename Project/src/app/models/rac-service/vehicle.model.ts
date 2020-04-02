import { Type } from './type.model';

export class Vehicle{
    public brand: string;
    public model: string;
    public type: Type;
    public yearOfProduction: number;
    public numberOfSeats: number;
    public rating: number;

    constructor(brand: string, model: string, yearOfProduction: number, numberOfSeats: number, rating: number){
        this.brand = brand;
        this.model = model;
        this.yearOfProduction = yearOfProduction;
        this.numberOfSeats = numberOfSeats;
        this.rating = rating;
    }
}