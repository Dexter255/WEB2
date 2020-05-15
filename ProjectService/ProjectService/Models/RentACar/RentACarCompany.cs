using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectService.Models.RentACar
{
    [Table("RentACarCompanies")]
    public class RentACarCompany
    {
        #region Fields
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
        public int Rating { get; set; }

        [Required]
        public List<Service> Services { get; set; }

        [Required]
        public List<Vehicle> Vehicles { get; set; }

        [Required]
        public List<Branch> Branches { get; set; }
        #endregion

        #region Constructors
        public RentACarCompany()
        {

        }

        public RentACarCompany(int id, string companyName, string address, string description, 
            List<Service> services, List<Vehicle> vehicles, List<Branch> branches)
        {
            Id = id;
            CompanyName = companyName;
            Address = address;
            Description = description;
            Rating = 0;
            Services = services;
            Vehicles = vehicles;
            Branches = branches;
        }
        #endregion
    }
}
