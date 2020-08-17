using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectService.Models.Flight
{
    [Table("Luggages")]
    public class Luggage
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int Weight { get; set; }

        [Required]
        public int Price { get; set; }
    }
}
