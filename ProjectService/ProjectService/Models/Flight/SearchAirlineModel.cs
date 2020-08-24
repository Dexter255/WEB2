using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectService.Models.Flight
{
    public class SearchAirlineModel
    {
        public string CompanyName { get; set; }
        public string Address { get; set; }
        public string FlightStartDestination { get; set; }
        public string FlightEndDestination { get; set; }
        public DateTime FlightStartDate { get; set; }
    }
}
