import { RentACarCompany } from '../models/rent-a-car/rac-company.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Vehicle } from '../models/rent-a-car/vehicle.model';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
})
export class RacCompanyService {
    public racCompanies: RentACarCompany[];
    private readonly BaseURI = 'https://localhost:44305/api';

    constructor(private http: HttpClient) {
        this.racCompanies = [];
    }

    // companies
    checkRacCompanyId(companyId: number) {
        // if(this.racCompanies.find(x => x.Id === companyId) === undefined)
        //     return false;

        return true;
    }
    
    getRacCompanies() {
        return this.http.get(this.BaseURI + '/RentACarCompany')
        .pipe(
            tap(res => this.racCompanies = res as RentACarCompany[])
        );
    }
    
    getRacCompany(companyId: number) {
        return this.http.get(this.BaseURI + '/RentACarCompany/' + companyId);
    }

    addRacCompany(racCompany: RentACarCompany) {
        return this.http.post(this.BaseURI + '/RentACarCompany', racCompany);
    }

    updateRacCompany(racCompany: RentACarCompany){
        return this.http.put(this.BaseURI + '/RentACarCompany/' + racCompany.Id, racCompany);
    }

    deleteRacCompany(companyId: number) {
        return this.http.delete(this.BaseURI + '/RentACarCompany/' + companyId);
    }
}