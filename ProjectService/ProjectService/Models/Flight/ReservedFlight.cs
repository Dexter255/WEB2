using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectService.Models.Flight
{
    [Table("ReservedFlights")]
    public class ReservedFlight
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int FlightId { get; set; }

        [Required]
        public string Destination { get; set; }

        [Required]
        public List<Passenger> Passengers { get; set; }

        [Required]
        public bool Landed { get; set; }

        [Required]
        public bool Rated { get; set; }

        [Required]
        public int Rating { get; set; }
    }
}
