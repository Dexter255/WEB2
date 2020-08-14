using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectService.Models.Users
{
    public class Friend
    {
        #region Fields
        [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(4)]
        public string Fullname { get; set; }

        [Required]
        [MinLength(4)]
        public string Username { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        [MinLength(4)]
        public string Address { get; set; }

        [Required]
        public string Number { get; set; }

        [NotMapped]
        public bool AreFriends { get; set; }
        #endregion

        #region Constructors
        public Friend()
        {

        }

        public Friend(string fullname, string username, string email, string address, string number, bool areFriends)
        {
            Fullname = fullname;
            Username = username;
            Email = email;
            Address = address;
            Number = number;
            AreFriends = areFriends;
        }
        #endregion
    }
}
