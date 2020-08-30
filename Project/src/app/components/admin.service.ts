import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'

import { User } from '../models/korisnik/user.model';

@Injectable({
    providedIn: 'root'
})
export class AdminService{
    private readonly BaseURI = 'https://localhost:44305/api';
    admins: User[];
    admin: User;

    constructor(private http: HttpClient) {
        this.admins = [];
    }

    getRacCompanyAdmins(){
        return this.http.get(this.BaseURI + '/Admin/GetAdmins/racCompany')
        .pipe(
            tap(res => this.admins = res as User[])
        );
    }
    
    getAirlineAdmins(){
        return this.http.get(this.BaseURI + '/Admin/GetAdmins/airline')
        .pipe(
            tap(res => this.admins = res as User[])
        );
    }
    
    getAdmin(username: string){
        return this.http.get(this.BaseURI + '/Admin/GetAdmin/' + username)
        .pipe(
            tap(
                (res: User) => this.admin = res
            )
        )
    }

    updateAdmin(admin: User){
        return this.http.put(this.BaseURI + '/Admin/UpdateAdmin/' + admin.Username, admin);
    }

    deleteAdmin(username: string){
        return this.http.delete(this.BaseURI + '/Admin/DeleteAdmin/' + username);
    }
}