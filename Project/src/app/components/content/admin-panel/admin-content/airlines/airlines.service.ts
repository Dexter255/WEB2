export class AirlinesService{
    public airlines: {companyName: string, address: string, description: string}[];

    constructor(){
        this.airlines = [];

        this.airlines.push({companyName: 'Kompanija1', address: 'Beograd', description: "OpisKompanije1"});
        this.airlines.push({companyName: 'Kompanija2', address: 'Novi Sad', description: "OpisKompanije2"});
        this.airlines.push({companyName: 'Kompanija3', address: 'Sremska Mitrovica', description: "OpisKompanije3"});
    }

    getAirlines(){
        return this.airlines;
    }

    getAirline(index: number){
        return this.airlines[index];
    }

    addAirline(airline: {companyName: string, address: string, description: string}){
        this.airlines.push(airline);
    }
    
    deleteAirline(index: number){
        this.airlines.splice(index, 1);
    }

    updateAirline(index: number, airline: {companyName: string, address: string, description: string}){
        this.airlines[index] = airline;
    }
}