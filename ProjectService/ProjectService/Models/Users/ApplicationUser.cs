using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectService.Models.Users
{
    public class ApplicationUser : IdentityUser
    {
        #region Fields
        public string Fullname { get; set; }
        public string Address { get; set; }
        public List<Friend> Friends { get; set; }
        public List<Friend> FriendRequests { get; set; }
        public List<Friend> FriendRequestsSent { get; set; }
        #endregion
    }
}
