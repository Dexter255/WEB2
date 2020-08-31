using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectService.Models.Flight
{
    [Table("Flights")]
    public class Flight
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string StartDestination { get; set; }

        [Required]
        public string EndDestination { get; set; }

        [Required]
        public DateTime StartDateAndTime { get; set; }

        [Required]
        public DateTime EndDateAndTime { get; set; }

        [Required]
        public string Hours { get; set; }

        [Required]
        public int Distance { get; set; }

        [Required]
        public List<Destination> Locations { get; set; }

        [Required]
        public int TicketPrice { get; set; }

        [Required]
        public int QuickReservationTicketCount { get; set; }

        [Required]
        public int Discount { get; set; }

        // mesta u avionu
        [Required]
        public List<Row> Rows { get; set; }

        [Required]
        public int Rating { get; set; }

        [Required]
        public int RatedCount { get; set; }
    }
}
