export class Friend{
    Id: number;
    Fullname: string;
    Username: string;
    Email: string;
    Address: string;
    Number: string;
    AreFriends: boolean;

    constructor(fullname: string, username: string, email: string, address: string, number: string, areFriends: boolean){
        this.Fullname = fullname;
        this.Username = username;
        this.Email = email;
        this.Address = address;
        this.Number = number;
        this.AreFriends = areFriends;
    }
}