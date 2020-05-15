using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectService.Models.RentACar
{
    [Table("Vehicles")]
    public class Vehicle
    {
        #region Fields
        [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(2)]
        public string Brand { get; set; }

        [Required]
        [MinLength(2)]
        public string Model { get; set; }

        [Required]
        public VehicleType Type { get; set; }

        [Required]
        public int CubicCapacity { get; set; }

        [Required]
        public int HorsePower { get; set; }

        [Required]
        public int YearOfProduction { get; set; }

        [Required]
        public int Kilometers { get; set; }

        [Required]
        public int NumberOfSeats { get; set; }

        [Required]
        public int Rating { get; set; }

        [Required]
        public List<FreeDate> FreeDates { get; set; }

        [Required]
        public RentACarCompany BelongToCompany { get; set; }

        [Required]
        public bool Reserved { get; set; }
        #endregion

        #region Constructors
        public Vehicle()
        {

        }

        public Vehicle(int id, string brand, string model, VehicleType type, int cubicCapacity, int horsePower, 
            int yearOfProduction, int kilometers, RentACarCompany belongToCompany, List<FreeDate> freeDates)
        {
            Id = id;
            Brand = brand;
            Model = model;
            Type = type;
            CubicCapacity = cubicCapacity;
            HorsePower = horsePower;
            YearOfProduction = yearOfProduction;
            Kilometers = kilometers;
            Rating = 0;
            FreeDates = freeDates;
            BelongToCompany = belongToCompany;
            Reserved = false;
        }
        #endregion
    }
}
