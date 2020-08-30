import { RentACarCompany } from '../models/rent-a-car/rac-company.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators'

@Injectable({
	providedIn: 'root'
})
export class RacCompanyService {
	private readonly BaseURI = 'https://localhost:44305/api';
	public racCompanies: RentACarCompany[];
	public racCompany: RentACarCompany;

	constructor(private http: HttpClient) {
		this.racCompanies = [];
	}

	getRacCompanies() {
		return this.http.get(this.BaseURI + '/RentACarCompany')
			.pipe(
				tap(res => this.racCompanies = res as RentACarCompany[])
			);
	}

	getRacCompany(companyId: number) {
		return this.http.get(this.BaseURI + '/RentACarCompany/' + companyId)
			.pipe(
				tap(
					((res: RentACarCompany) => this.racCompany = res)
				)
			)
	}

	addRacCompany(racCompany: RentACarCompany) {
		return this.http.post(this.BaseURI + '/RentACarCompany', racCompany);
	}

	updateRacCompany(racCompany: RentACarCompany) {
		return this.http.put(this.BaseURI + '/RentACarCompany/' + racCompany.Id, racCompany);
	}

	deleteRacCompany(companyId: number) {
		return this.http.delete(this.BaseURI + '/RentACarCompany/' + companyId);
	}

	searchRacCompanies(body: any) {
		return this.http.post(this.BaseURI + '/RentACarCompany/SearchRacCompanies', body)
			.pipe(
				tap(
					((res: RentACarCompany[]) => {
						this.racCompanies = res;
					})
				)
			)
	}
}