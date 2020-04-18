import { korisnik } from 'src/app/models/korisnik/korisnik';
import { UserType } from 'src/app/models/korisnik/user-type.model';

export class AdminsService{
    racCompaniesAdmins: korisnik[] = [];
    airlinesAdmins: korisnik[] = [];

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
        
        this.airlinesAdmins.push(user1);
        this.airlinesAdmins.push(user2);

        this.racCompaniesAdmins.push(user3);
        this.racCompaniesAdmins.push(user4);
    }

    getRentACarCompaniesAdmins(){
        return this.racCompaniesAdmins;
    }

    deleteRentACarCompanyAdmin(index: number){
        this.racCompaniesAdmins.splice(index, 1);
    }

    addRentACarCompanyAdmin(user: korisnik){
        this.racCompaniesAdmins.push(user);
    }


    getAirlinesAdmins(){
        return this.airlinesAdmins;
    }

    deleteAirlineAdmin(index: number){
        this.airlinesAdmins.splice(index, 1);
    }

    addAirlinesAdmin(user: korisnik){
        this.airlinesAdmins.push(user);
    }

    // getRentACarAdmin(index: number){
    //     return this.rentACarAdmins[index];
    // }

    // getAirlinesAdmin(index: number){
    //     return this.airlinesAdmins[index];
    // }

}