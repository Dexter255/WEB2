export class Service{
    public description: string;
    public price: number;

    constructor(description: string, price: number){
        this.description = description;
        this.price = price;
    }

    getService(){
        return this.description + " - " + this.price;
    }
}