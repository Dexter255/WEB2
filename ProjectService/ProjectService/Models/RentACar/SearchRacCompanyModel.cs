using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectService.Models.RentACar
{
    public class SearchRacCompanyModel
    {
        public string CompanyName { get; set; }
        public string Address { get; set; }
        public DateTime VehicleNeededFrom { get; set; }
        public DateTime VehicleNeededTo { get; set; }
    }
}
