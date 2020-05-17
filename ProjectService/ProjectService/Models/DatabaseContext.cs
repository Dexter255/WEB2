﻿using Microsoft.EntityFrameworkCore;
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

        #region RentACarCompany
        public DbSet<RentACarCompany> RentACarCompanies { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Branch> Branches { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<FreeDate> FreeDates { get; set; }
        #endregion
    }
}