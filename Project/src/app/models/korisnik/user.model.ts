import { UserType } from './user-type.model';

export class User
{
    Id: number;
    Name: string;
    Lastname: string;
    Email: string;
    Address: string;
    Number: string;
    Password: string;
    Type: UserType;

    constructor(id: number, name: string, lastname: string, email: string, address: string, number: string, password: string, type: UserType){
        this.Id = id;
        this.Name = name;
        this.Lastname = lastname;
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