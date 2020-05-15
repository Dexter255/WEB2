export class Service{
    public Id: number;
    public Description: string;
    public Price: number;

    constructor(id: number, description: string, price: number){
        this.Id = id;
        this.Description = description;
        this.Price = price;
    }

    public toString = () : string => {
        return this.Description + ", " + this.Price + "€";
    }
}