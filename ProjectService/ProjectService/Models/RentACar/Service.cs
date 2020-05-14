using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectService.Models.RentACar
{
    [Table("Services")]
    public class Service
    {
        #region Fields
        [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(4)]
        public string Description { get; set; }

        [Required]
        public int Price { get; set; }
        #endregion

        #region Constructors
        public Service()
        {

        }

        public Service(int id, string description, int price)
        {
            Id = id;
            Description = description;
            Price = price;
        }
        #endregion
    }
}
