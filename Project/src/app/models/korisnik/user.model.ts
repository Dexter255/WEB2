import { UserType } from './user-type.model';
import { Friend } from './friend.model';

export class User
{
    Fullname: string;
    Username: string;
    Email: string;
    Address: string;
    Number: string;
    Password: string;
    Type: UserType;
    Friends: Friend[];
    FriendRequests: Friend[];
    FriendRequestsSent: Friend[];

    constructor(fullname: string, username: string, email: string, address: string, number: string, password: string, type: UserType){
        this.Fullname = fullname;
        this.Username = username;
        this.Email = email;
        this.Address = address;
        this.Number = number;
        this.Password = password;
        this.Type = type;
        this.Friends = [];
    }
};