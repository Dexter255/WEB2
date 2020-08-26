using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectService.Models.Flight
{
    public class SeatModel
    {
        public int RowId { get; set; }
        public int SeatId { get; set; }
        public string User_Username { get; set; }
        public string User_Fullname { get; set; }
        public string User_PassportNumber { get; set; }
    }
}
