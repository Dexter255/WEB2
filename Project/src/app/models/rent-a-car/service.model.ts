export class Service{
    public description: string;
    public price: number;

    constructor(description: string, price: number){
        this.description = description;
        this.price = price;
    }

    public toString = () : string => {
        return this.description + ", " + this.price + "€";
    }
}