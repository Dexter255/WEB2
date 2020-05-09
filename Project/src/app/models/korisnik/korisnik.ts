import { UserType } from './user-type.model';

export class korisnik
{
    id: number;
    private static nextId: number = 0;
    ime: string;
    prezime: string;
    email: string;
    adresa: string;
    telefon: string;
    password: string;
    type: UserType;

    constructor(ime: string, prezime: string, email: string, adresa: string, telefon: string, password: string, type: UserType){
        this.id = korisnik.nextId++;
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
    
    setType(userType: UserType){
        this.type = userType;
    }
};