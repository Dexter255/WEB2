import { korisnik } from '../models/korisnik/korisnik';
import { UserType } from '../models/korisnik/user-type.model';

export class AdminService{
    admins: korisnik[] = [];

    constructor(){
        //mock data
        let user1 = new korisnik('Jelena','Jelenic', 'jelenajelenic@gmail.com', 'Nis', 
        '0640551693', '123123', UserType.Admin_Airlines);
        
        let user2 = new korisnik('Imenko','Prezimenic', 'imenkoprezimenic@gmail.com', 'Sremska Mitrovica', 
        '0651235478', '123123', UserType.Admin_Airlines);
        
        let user3 = new korisnik('Pera','Peric', 'peraperic@gmail.com', 'Beograd', 
        '0648932597', '123123', UserType.Admin_RentACarCompanies);
        
        let user4 = new korisnik('Marko','Markovic', 'markomarkovic@gmail.com', 'Novi Sad', 
        '0653697516', '123123', UserType.Admin_RentACarCompanies);
        
        this.admins.push(user1);
        this.admins.push(user2);
        this.admins.push(user3);
        this.admins.push(user4);
    }

    checkAdminId(id: number){
        for(let i = 0; i < this.admins.length; i++){
            if(this.admins[i].id === id)
                return true;
        }

        return false;
    }
    
    getRentACarCompanyAdmins(){
        let racCompanyAdmins: korisnik[] = [];
        
        for(let i = 0; i < this.admins.length; i++){
            if(this.admins[i].type === UserType.Admin_RentACarCompanies)
                racCompanyAdmins.push(this.admins[i]);
        }
        
        return racCompanyAdmins;
    }
    
    getAirlineAdmins(){
        let airlineAdmins: korisnik[] = [];
        
        for(let i = 0; i < this.admins.length; i++){
            if(this.admins[i].type === UserType.Admin_Airlines)
            airlineAdmins.push(this.admins[i]);
        }
        
        return airlineAdmins;
    }
    
    deleteAdmin(id: number){
        let index = this.admins.indexOf(this.admins.find(x => x.id === id));
        this.admins.splice(index, 1);
    }

    getAdmin(id: number){
        return this.admins.find(x => x.id === id);
    }

    addAdmin(name: string, lastname: string, email: string, address: string, number: string, type: UserType){
        this.admins.push(new korisnik(name, lastname, email, address, number, '123123', type));
    }

    updateAdmin(id: number, name: string, lastname: string, email: string, address: string, number: string){
        let admin = this.admins.find(x => x.id === id);
        admin.ime = name;
        admin.prezime = lastname;
        admin.email = email;
        admin.adresa = address;
        admin.telefon = number;
    }
}