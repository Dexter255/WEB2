import { Injectable } from '@angular/core';

import { User } from '../models/korisnik/user.model';
import { UserType } from '../models/korisnik/user-type.model';

@Injectable({
    providedIn: 'root'
})
export class ServerService{
    private loggedIn = false;
    private user: User;

    constructor(){
        // trenutno ulogovan user
        this.loggedIn = true;
        this.user = new User(0, 'Mihajlo', 'Rohalj', 'mihajlorohalj97@gmail.com', 'Sremska Mitrovica, Ratarska 32', '0640551693',
        '123123', UserType.Admin);

        // this.users.push(this.user);
    }

    login(email: string, password: string): boolean{
        // for(let i = 0; i < this.users.length; i++){
        //     if(this.users[i].email === email){
        //         if(this.users[i].password === password){
        //             this.user = this.users[i];
        //             this.loggedIn =  true;
        //             return true;
        //         }
        //         else{
        //             return false;
        //         }
        //     }
        // }
        return false;
    }

    logout(){
        //this.user = null;
        this.loggedIn = false;
    }

    // register(user: korisnik){
    //    // this.users.push(user);
    // }

    isUserLoggedIn(){
        return this.loggedIn;
    }

    getUserType(){
        return UserType[this.user.Type];
    }
}