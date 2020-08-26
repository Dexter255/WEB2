export class SeatModel{
    public RowId: number;
    public SeatId: number;
    public User_Username: string;
    public User_Fullname: string;
    public User_PassportNumber: string;

    constructor(rowId: number, seatId: number, user_Username: string, user_Fullname: string, user_Passportnumber: string){
        this.RowId = rowId;
        this.SeatId = seatId;
        this.User_Username = user_Username;
        this.User_Fullname = user_Fullname;
        this.User_PassportNumber = user_Passportnumber;
    }
}