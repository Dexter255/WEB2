using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectService.Models.Users
{
    [Table("Users")]
    public class User
    {
        #region Fields
        [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(4)]
        public string Name { get; set; }

        [Required]
        [MinLength(4)]
        public string Lastname { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        [MinLength(4)]
        public string Address { get; set; }

        [Required]
        public string Number { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public UserType Type { get; set; }
        #endregion

        #region Constructors
        public User()
        {

        }

        public User(int id, string name, string lastname, string email, string address,
            string number, string password, UserType type)
        {
            Id = id;
            Name = name;
            Lastname = lastname;
            Email = email;
            Address = address;
            Number = number;
            Password = password;
            Type = type;
        }

        #endregion
    }
}


