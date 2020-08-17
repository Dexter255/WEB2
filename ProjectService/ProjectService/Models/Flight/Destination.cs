using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectService.Models.Flight
{
    [Table("Destinations")]
    public class Destination
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(2)]
        public string City { get; set; }
    }
}
