import { UserType } from './user-type.model';
import { Friend } from './friend.model';
import { ReservedFlight } from '../flight/reserved-flight.model';
import { Flight } from '../flight/flight.model';

export class User
{
    Fullname: string;
    Username: string;
    Email: string;
    Address: string;
    Number: string;
    Password: string;
    Type: UserType;
    PassportNumber: string;
    Friends: Friend[];
    FriendRequests: Friend[];
    FriendRequestsSent: Friend[];
    ReservedFlight: ReservedFlight[];
    FlightInvitations: Flight[];

    constructor(fullname: string, username: string, email: string, address: string, number: string, password: string, type: UserType, passportNumber?: string){
        this.Fullname = fullname;
        this.Username = username;
        this.Email = email;
        this.Address = address;
        this.Number = number;
        this.Password = password;
        this.Type = type;
        this.Friends = [];
        this.PassportNumber = passportNumber;
    }
};