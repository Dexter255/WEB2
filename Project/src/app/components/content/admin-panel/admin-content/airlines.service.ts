export class AirlinesService{
    public airlines: {name: string}[];

    constructor(){
        this.airlines = [];

        this.airlines.push({name: 'Mihajlo'});
        this.airlines.push({name: 'Rohalj'});
        this.airlines.push({name: 'Imenko'});
        this.airlines.push({name: 'Prezimenic'});
    }

    getAirlines(){
        return this.airlines;
    }

    getAirline(index: number){
        return this.airlines[index];
    }

    deleteAirline(index: number){
        this.airlines.splice(index, 1);
    }
}