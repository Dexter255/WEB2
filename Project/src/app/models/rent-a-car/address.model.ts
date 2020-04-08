export class Address{
    public country: string;
    public city: string;
    public street: string;
    public number: number;
    public zipCode: number;

    constructor(country: string, city: string, street: string, number: number, zipCode: number){
        this.country = country;
        this.city = city;
        this.street = street;
        this.number = number;
        this.zipCode = zipCode;
    }

    getAddress(){
        return this.country + ", " + this.city + ", " + this.street + " " + this.number + ", " + this.zipCode;
    }
}