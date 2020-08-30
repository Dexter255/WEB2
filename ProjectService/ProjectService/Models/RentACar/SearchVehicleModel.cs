using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectService.Models.RentACar
{
    public class SearchVehicleModel
    {
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string Brand { get; set; }
        public string Type { get; set; }
        public string Seat { get; set; }
    }
}
