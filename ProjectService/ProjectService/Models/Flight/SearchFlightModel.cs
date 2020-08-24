using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectService.Models.Flight
{
    public class SearchFlightModel
    {
        public string StartDestination { get; set; }
        public string EndDestination { get; set; }
        public DateTime StartDate { get; set; }
        public string TicketPrice { get; set; }
    }
}
