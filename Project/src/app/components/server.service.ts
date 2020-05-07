import { korisnik } from '../models/korisnik/korisnik';
import { UserType } from '../models/korisnik/user-type.model';

export class ServerService{
    private loggedIn = false;
    private user: korisnik;
    private users: korisnik[];

    constructor(){
        this.users = [];
        // trenutno ulogovan user
        this.loggedIn = true;
        this.user = new korisnik('Mihajlo', 'Rohalj', 'mihajlorohalj97@gmail.com', 'Sremska Mitrovica, Ratarska 32', '0640551693',
        '123123', UserType.Admin_RentACarCompanies);

        this.users.push(this.user);
    }

    login(email: string, password: string): boolean{
        for(let i = 0; i < this.users.length; i++){
            if(this.users[i].email === email){
                if(this.users[i].password === password){
                    this.user = this.users[i];
                    this.loggedIn =  true;
                    return true;
                }
                else{
                    return false;
                }
            }
        }
        return false;
    }

    logout(){
        this.user = null;
        this.loggedIn = false;
    }

    register(user: korisnik){
        this.users.push(user);
    }

    isUserLoggedIn(){
        return this.loggedIn;
    }

    getUserType(){
        return this.user.getType();
    }
}