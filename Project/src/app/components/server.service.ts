import { Injectable } from '@angular/core';

import { User } from '../models/korisnik/user.model';
import { UserType } from '../models/korisnik/user-type.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ServerService{
    private user: User;
    private readonly BaseURI = 'https://localhost:44305/api';

    constructor(private http: HttpClient,
        private router: Router){}

    login(body: any){
        return this.http.post(this.BaseURI + '/ApplicationUser/Login', body);
    }

    logout(){
        localStorage.removeItem('token');
        this.router.navigate(['']);
    }

    register(user: User){
        return this.http.post(this.BaseURI + '/ApplicationUser/Register', user);
    }

    getUserProfile(){
        return this.http.get(this.BaseURI + '/ApplicationUser/GetUserProfile');
    }
    
    isUserLoggedIn(){
        return localStorage.getItem('token') !== null;
    }

    getUserType(){
        return UserType[UserType.Admin];
    }
}