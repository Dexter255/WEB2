using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectService.Models.Flight
{
    [Table("QuickReservationTickets")]
    public class QuickReservationTicket
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
        public int TicketPrice { get; set; }

        // mesto u avionu koje je rezervisano   ???

        [Required]
        public int Discount { get; set; }
    }
}
