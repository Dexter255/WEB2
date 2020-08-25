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

        public string User_Name { get; set; }

        public string User_Lastname { get; set; }

        public string User_PassportNumber { get; set; }
    }
}
