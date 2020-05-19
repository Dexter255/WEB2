import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'

import { User } from '../models/korisnik/user.model';
import { UserType } from '../models/korisnik/user-type.model';

@Injectable({
    providedIn: 'root'
})
export class AdminService{
    admins: User[];
    private readonly BaseURI = 'https://localhost:44305/api';

    constructor(private http: HttpClient) {
        this.admins = [];
    }

    checkAdminId(id: number){
        //return this.http.get(this.BaseURI + '/Admin/RacCompanyAdmins');
        return false;
    }
    
    getRacCompanyAdmins(){
        return this.http.get(this.BaseURI + '/Admin/all/racCompany')
        .pipe(
            tap(res => this.admins = res as User[])
        );
    }
    
    getAirlineAdmins(){
        return this.http.get(this.BaseURI + '/Admin/all/airline')
        .pipe(
            tap(res => this.admins = res as User[])
        );
    }
    
    getAdmin(id: number){
        return this.http.get(this.BaseURI + '/Admin/' + id);
    }

    addAdmin(admin: User){
        return this.http.post(this.BaseURI + '/Admin', admin);
    }

    updateAdmin(admin: User){
        return this.http.put(this.BaseURI + '/Admin/' + admin.Id, admin);
    }

    deleteAdmin(id: number){
        return this.http.delete(this.BaseURI + '/Admin/' + id);
    }
}