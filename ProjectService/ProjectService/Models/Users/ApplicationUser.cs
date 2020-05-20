using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectService.Models.Users
{
    public class ApplicationUser : IdentityUser
    {
        #region Fields
        public string Fullname { get; set; }
        public string Address { get; set; }
        #endregion
    }
}
