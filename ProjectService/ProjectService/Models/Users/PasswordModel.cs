using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectService.Models.Users
{
    public class PasswordModel
    {
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
