using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectService.Models.RentACar
{
    [Table("FreeDates")]
    public class FreeDate
    {
        #region Fields
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime Date { get; set; }
        #endregion

        #region Constructors
        public FreeDate()
        {

        }

        public FreeDate(int id, DateTime date)
        {
            Id = id;
            Date = date;
        }
        #endregion
    }
}
