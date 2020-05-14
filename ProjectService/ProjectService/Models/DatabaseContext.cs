using Microsoft.EntityFrameworkCore;
using ProjectService.Models.RentACar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectService.Models
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {

        }

        public DbSet<RentACarCompany> RentACarCompanies { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
    }
}
