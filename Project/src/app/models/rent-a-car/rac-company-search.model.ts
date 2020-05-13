import { Vehicle } from './vehicle.model';

export class RentACarCompanySearch{
    id: number;
    companyName: string;
    address: string;
    vehicles: Vehicle[];
    fromDate: string;
    toDate: string;

    constructor(id: number, companyName: string, address: string, fromDate: string, toDate: string, vehicles: Vehicle[]){
        this.id = id;
        this.companyName = companyName;
        this.address = address;
        this.vehicles = vehicles;
        this.fromDate = fromDate;
        this.toDate = toDate;
    }

    checkVehicleFreeDatesFromOrTo(fromOrToDate: string): boolean {
        let date = new Date(fromOrToDate);

        this.vehicles = this.vehicles.filter(x => x.freeDates.find(y => 
            y.getFullYear() === date.getFullYear() && 
            y.getMonth() === date.getMonth() && 
            y.getDate() === date.getDate()));
        
        if(this.vehicles.length !== 0)
            return true;

        return false;
    }

    checkVehicleFreeDatesFromTo(fromDate: string, toDate: string): boolean {
        let from = new Date(fromDate);
        let to = new Date(toDate);
        let startDate = from.getDate();
        let vehicleIds: number[] = [];
        let free: boolean;

        for (let i = 0; i < this.vehicles.length; i++) {
            from.setDate(startDate);
            free = true;
            while (from <= to) {
                let date = this.vehicles[i].freeDates.find(x => x.getFullYear() === from.getFullYear() &&
                    x.getMonth() === from.getMonth() &&
                    x.getDate() === from.getDate());

                if(date === undefined){
                    free = false;
                    break;
                }

                from.setDate(from.getDate() + 1);
            }
            
            if(!free)
                vehicleIds.push(this.vehicles[i].id);
        }

        for(let i = 0; i < vehicleIds.length; i++){
            let vehicleId = this.vehicles.indexOf(this.vehicles.find(x => x.id === vehicleIds[i]));
            this.vehicles.splice(vehicleId, 1);
        }
        
        if(this.vehicles.length !== 0)
            return true;

        return false;
    }
}