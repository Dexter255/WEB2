using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectService.Models.Flight
{
    [Table("Seats")]
    public class Seat
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public SeatType Type { get; set; }

        public string User_Username { get; set; }

        public string User_Fullname { get; set; }

        public string User_PassportNumber { get; set; }
    }
}
