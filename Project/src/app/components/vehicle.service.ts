import { Vehicle } from '../models/rent-a-car/vehicle.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class VehicleService{
    vehicles: Vehicle[];
    private readonly BaseURI = 'https://localhost:44305/api';

    constructor(private http: HttpClient){}

    // vehicles
    // checkVehicleId(companyId: number, vehicleId: number) {
    //     if(this.racCompanies.find(x => x.Id === companyId).Vehicles.find(x => x.id === vehicleId) === undefined)
    //         return false

    //     return true;
    // }

    getVehicles(companyId: number) {
        return this.http.get(this.BaseURI + '/Vehicle/' + companyId);
    }

    getVehicle(companyId: number, vehicleId: number) {
        return this.http.get(this.BaseURI + 'Vehicle/' + companyId + '/' + vehicleId);
    }

    addVehicle(vehicle: Vehicle){
        return this.http.post(this.BaseURI + '/Vehicle', vehicle);
    }

    updateVehicle(vehicle: Vehicle){
        return this.http.put(this.BaseURI + '/Vehicle/' + vehicle.Id, vehicle);
    }
    
    deleteRacCompany(vehicleId: number) {
        return this.http.delete(this.BaseURI + '/Vehicle/' + vehicleId);
    }

    // reserveVehicle(companyId: number, vehicleId: number){
    //     this.racCompanies.find(x => x.Id === companyId).Vehicles.find(x => x.id === vehicleId).reserved = true;
    // }
}