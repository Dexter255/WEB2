using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectService.Models.Flight
{
    [Table("Airlines")]
    public class Airline
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(4)]
        public string CompanyName { get; set; }

        [Required]
        [MinLength(4)]
        public string Address { get; set; }

        [Required]
        [MinLength(4)]
        public string Description { get; set; }

        [Required]
        public List<Destination> Destinations { get; set; }

        [Required]
        public List<Flight> Flights { get; set; }

        [Required]
        public List<Luggage> LuggageInfo { get; set; }

        [Required]
        public double Rating { get; set; }

        [Required]
        public int RatedCount { get; set; }
    }
}
