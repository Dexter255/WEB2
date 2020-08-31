export class ReservedVehicle{
    public Id: number;
    public VehicleId: number;
    public Brand: string;
    public Model: string;
    public PickupDate: Date;
    public GetInCity: string;
    public ReturnDate: Date;
    public ReturnToCity: string;
    public Returned: boolean;
    public Rated: boolean;
    public Rating: number;
    
    constructor(vehicleId: number, pickupDate: Date, getInCity: string, returnDate: Date, returnToCity: string){
        this.VehicleId = vehicleId;
        this.Brand = 'brand';
        this.Model = 'model';
        this.PickupDate = pickupDate;
        this.GetInCity = getInCity;
        this.ReturnDate = returnDate;
        this.ReturnToCity = returnToCity;
    }
}