using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ProjectService.Models.Flight;
using ProjectService.Models.RentACar;
using ProjectService.Models.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectService.Models
{
    public class DatabaseContext : IdentityDbContext
    {
        public DatabaseContext(DbContextOptions options) : base(options)
        {

        }

        #region RentACarCompany
        public DbSet<RentACarCompany> RentACarCompanies { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Branch> Branches { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<FreeDate> FreeDates { get; set; }
        #endregion


        #region Airline
        public DbSet<Airline> Airlines { get; set; }
        public DbSet<Destination> Destinations { get; set; }
        public DbSet<Flight.Flight> Flights{ get; set; }
        public DbSet<Luggage> Luggages { get; set; }
        public DbSet<QuickReservationTicket> QuickReservationTickets{ get; set; }
        public DbSet<ReservedFlight> ReservedFlights { get; set; }
        public DbSet<FlightInvitation> FlightInvitations { get; set; }
        public DbSet<Passenger> Passengers { get; set; }
        public DbSet<Row> Rows { get; set; }
        public DbSet<Seat> Seats { get; set; }
        #endregion


        #region Users
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        #endregion
    }
}
