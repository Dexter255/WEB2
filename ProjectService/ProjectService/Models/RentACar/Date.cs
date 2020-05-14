using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectService.Models.RentACar
{
    [Table("Dates")]
    public class Date
    {
        #region Fields
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime FreeDate { get; set; }
        #endregion

        #region Constructors
        public Date()
        {

        }

        public Date(int id, DateTime freeDate)
        {
            Id = id;
            FreeDate = freeDate;
        }
        #endregion
    }
}
