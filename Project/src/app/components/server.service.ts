import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from '../models/korisnik/user.model';

@Injectable({
    providedIn: 'root'
})
export class ServerService {
    private user: User;
    private readonly BaseURI = 'https://localhost:44305/api';

    constructor(private http: HttpClient,
        private router: Router) { }

    login(body: any) {
        return this.http.post(this.BaseURI + '/ApplicationUser/Login', body);
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['']);
    }

    register(user: User) {
        return this.http.post(this.BaseURI + '/ApplicationUser/Register', user);
    }

    getUserProfile() {
        return this.http.get(this.BaseURI + '/ApplicationUser/GetUserProfile');
    }

    isUserLoggedIn() {
        return localStorage.getItem('token') !== null;
    }

    getUserType() {
        let token = localStorage.getItem('token');

        let jwtData = token.split('.')[1];
        let decodedJwtJsonData = window.atob(jwtData);
        let decodedJwtData = JSON.parse(decodedJwtJsonData);

        return decodedJwtData.role;
    }

    updateUser(user: User){
        return this.http.put(this.BaseURI + '/ApplicationUser/UpdateUser/' + user.Username, user);
    }
}