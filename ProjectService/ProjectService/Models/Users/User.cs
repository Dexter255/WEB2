using ProjectService.Models.Flight;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectService.Models.Users
{
    public class User
    {
        #region Fields
        public string Fullname { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Number { get; set; }
        public string Password { get; set; }
        public UserType Type { get; set; }
        public string PassportNumber { get; set; }
        public List<Friend> Friends { get; set; }
        public List<Friend> FriendRequests { get; set; }
        public List<Friend> FriendRequestsSent { get; set; }
        public List<ReservedFlight> ReservedFlights { get; set; }
        public List<Flight.Flight> FlightInvitations { get; set; }
        #endregion

        #region Constructors
        public User()
        {

        }

        public User(string fullname, string username, string email, string address,
            string number, string password, UserType type)
        {
            Fullname = fullname;
            Username = username;
            Email = email;
            Address = address;
            Number = number;
            Password = password;
            Type = type;
            Friends = new List<Friend>();
            FriendRequests = new List<Friend>();
            FriendRequestsSent = new List<Friend>();
        }

        #endregion
    }
}


