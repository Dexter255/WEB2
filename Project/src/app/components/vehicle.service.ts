import { Vehicle } from '../models/rent-a-car/vehicle.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class VehicleService{
    vehicles: Vehicle[];
    private readonly BaseURI = 'https://localhost:44305/api';

    constructor(private http: HttpClient){
        this.vehicles = [];
    }

    checkVehicleId(companyId: number, vehicleId: number) {
        // if(this.vehicles.find(x => x.Id === companyId).Vehicles.find(x => x.id === vehicleId) === undefined)
        //     return false

        return true;
    }

    getVehicles(companyId: number){
        return this.http.get(this.BaseURI + '/Vehicle/' + 'all/' + companyId);
    }
    
    getVehicle(vehicleId: number){
        return this.http.get(this.BaseURI + '/Vehicle/' + vehicleId);
    }

    updateVehicle(vehicle: Vehicle){
        return this.http.put(this.BaseURI + '/Vehicle/' + vehicle.Id, vehicle);
    }
    
    deleteVehicle(vehicleId: number){
        return this.http.delete(this.BaseURI + '/Vehicle/' + vehicleId);
    }
}