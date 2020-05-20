import { UserType } from './user-type.model';

export class User
{
    Id: number;
    Fullname: string;
    Username: string;
    Email: string;
    Address: string;
    Number: string;
    Password: string;
    Type: UserType;

    constructor(fullname: string, username: string, email: string, address: string, number: string, password: string, type: UserType){
        this.Fullname = fullname;
        this.Username = username;
        this.Email = email;
        this.Address = address;
        this.Number = number;
        this.Password = password;
        this.Type = type;
    }

    // getType(){
    //     //return UserType[this.type];
    //     return null;
    // }
    
    // setType(userType: UserType){
    //     //this.type = userType;
    // }
};