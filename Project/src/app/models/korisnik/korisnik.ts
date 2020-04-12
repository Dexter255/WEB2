
export class korisnik
{
    ime: string;
    prezime: string;
    email: string;
    adresa: string;
    telefon: number;
    password: string;

    constructor(ime: string, prezime: string, email: string, adresa: string, telefon: number, password: string){
        this.ime = ime;
        this.prezime = prezime;
        this.email = email;
        this.adresa = adresa;
        this.telefon = telefon;
        this.password = password;
    }
};