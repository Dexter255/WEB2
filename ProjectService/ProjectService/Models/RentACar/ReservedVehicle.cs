using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectService.Models.RentACar
{
    [Table("ReservedVehicles")]
    public class ReservedVehicle
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int VehicleId { get; set; }

        [Required]
        public string Brand { get; set; }

        [Required]
        public string Model { get; set; }

        [Required]
        public DateTime PickupDate { get; set; }

        [Required]
        public string GetInCity { get; set; }

        [Required]
        public DateTime ReturnDate { get; set; }

        [Required]
        public string ReturnToCity { get; set; }

        [Required]
        public bool Returned { get; set; }

        [Required]
        public bool Rated { get; set; }

        [Required]
        public int Rating { get; set; }
    }
}
