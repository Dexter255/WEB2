import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { Vehicle } from '../models/rent-a-car/vehicle.model';
import { ReservedVehicle } from '../models/rent-a-car/reserved-vehicle.model';

@Injectable({
    providedIn: 'root'
})
export class VehicleService {
    private readonly BaseURI = 'https://localhost:44305/api';
    vehicles: Vehicle[];
    vehicle: Vehicle;
    reservedVehicles: ReservedVehicle[];
    reservedVehicle: ReservedVehicle;

    constructor(private http: HttpClient) {
        this.vehicles = [];
        this.reservedVehicles = [];
    }

    getVehicles(companyId: number) {
        return this.http.get(this.BaseURI + '/Vehicle/' + 'all/' + companyId)
            .pipe(
                tap(
                    (res: Vehicle[]) => {
                        this.vehicles = res;
                    }
                )
            );
    }

    getVehicle(vehicleId: number) {
        return this.http.get(this.BaseURI + '/Vehicle/GetVehicle/' + vehicleId)
            .pipe(
                tap(
                    (res: Vehicle) => {
                        this.vehicle = res;
                    }
                )
            )
    }

    updateVehicle(vehicle: Vehicle) {
        return this.http.put(this.BaseURI + '/Vehicle/' + vehicle.Id, vehicle);
    }

    deleteVehicle(vehicleId: number) {
        return this.http.delete(this.BaseURI + '/Vehicle/' + vehicleId);
    }

    searchVehicles(companyId: number, body: any) {
        return this.http.post(this.BaseURI + '/Vehicle/SearchVehicles/' + companyId, body)
            .pipe(
                tap(
                    ((res: Vehicle[]) => {
                        this.vehicles = res;
                    })
                )
            )
    }

    reserveVehicle(body: any) {
        return this.http.post(this.BaseURI + '/Vehicle/ReserveVehicle', body);
    }

    getReservedVehicles() {
        return this.http.get(this.BaseURI + '/Vehicle/GetReservedVehicles')
            .pipe(
                tap(
                    ((res: ReservedVehicle[]) => {
                        this.reservedVehicles = res;
                    })
                )
            );
    }

    cancelReservation(vehicleId: number){
        return this.http.get(this.BaseURI + '/Vehicle/CancelReservation/' + vehicleId);
    }

    getReservedVehicle(vehicleId: number){
        return this.http.get(this.BaseURI + '/Vehicle/GetReservedVehicle/' + vehicleId)
        .pipe(
            tap(
                ((res: ReservedVehicle) => {
                    this.reservedVehicle = res;
                })
            )
        )
    }

    rateVehicle(vehicleId, companyRating: number, rating: number){
        return this.http.get(this.BaseURI + '/Vehicle/RateReservedVehicle/' + vehicleId + '/' + companyRating + '/' + rating);
    }
}