import { korisnik } from '../models/korisnik/korisnik';
import { OnInit } from '@angular/core';

export class ServerService{
    private loggedIn = false;
    private user: korisnik;
    private users: korisnik[];

    constructor(){
        this.users = [];
    }

    login(email: string, password: string): number{
        this.users.forEach(element => {
            if(element.email === email){
                if(element.password === password){
                    return 1;
                }
            }
        });
        return 0;
    }

    logout(){

    }

    register(user: korisnik){
        this.users.push(user);
    }
}