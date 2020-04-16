import { UserType } from './user-type.model';

export class korisnik
{
    ime: string;
    prezime: string;
    email: string;
    adresa: string;
    telefon: string;
    password: string;
    type: UserType;

    constructor(ime: string, prezime: string, email: string, adresa: string, telefon: string, password: string, type: UserType){
        this.ime = ime;
        this.prezime = prezime;
        this.email = email;
        this.adresa = adresa;
        this.telefon = telefon;
        this.password = password;
        this.type = type;
    }

    getType(){
        return UserType[this.type];
    }
};