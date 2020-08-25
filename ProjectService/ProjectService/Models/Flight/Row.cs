using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectService.Models.Flight
{
    [Table("Rows")]
    public class Row
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public List<Seat> Seats { get; set; }

        public Row()
        {
            Seats = new List<Seat>();
        }
    }
}
