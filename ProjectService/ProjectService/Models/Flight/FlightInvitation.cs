using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectService.Models.Flight
{
    [Table("FlightInvitations")]
    public class FlightInvitation
    {
        [Key]
        public int Id { get; set; }
        public int FlightId { get; set; }
        public string Destination { get; set; }
        public string InvitationFromUser { get; set; }
        public Option Option { get; set; }
    }
}
