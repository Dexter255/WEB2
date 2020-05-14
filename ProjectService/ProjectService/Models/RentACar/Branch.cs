using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectService.Models.RentACar
{
    [Table("Branches")]
    public class Branch
    {
        #region Fields
        [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(4)]
        public string Address { get; set; }
        #endregion

        #region Constructors
        public Branch()
        {

        }

        public Branch(int id, string address)
        {
            Id = id;
            Address = address;
        }
        #endregion
    }
}
