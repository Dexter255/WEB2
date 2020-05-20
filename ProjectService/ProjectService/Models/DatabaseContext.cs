using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
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

        //#region Admin
        //public DbSet<User> Admins { get; set; }
        //#endregion

        #region Users
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        #endregion
    }
}
