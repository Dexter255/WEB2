﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ProjectService.Models;

namespace ProjectService.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    partial class DatabaseContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ProjectService.Models.RentACar.Branch", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .IsRequired();

                    b.Property<int?>("RentACarCompanyId");

                    b.HasKey("Id");

                    b.HasIndex("RentACarCompanyId");

                    b.ToTable("Branches");
                });

            modelBuilder.Entity("ProjectService.Models.RentACar.FreeDate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Date");

                    b.Property<int?>("VehicleId");

                    b.HasKey("Id");

                    b.HasIndex("VehicleId");

                    b.ToTable("FreeDates");
                });

            modelBuilder.Entity("ProjectService.Models.RentACar.RentACarCompany", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .IsRequired();

                    b.Property<string>("CompanyName")
                        .IsRequired();

                    b.Property<string>("Description")
                        .IsRequired();

                    b.Property<int>("Rating");

                    b.HasKey("Id");

                    b.ToTable("RentACarCompanies");
                });

            modelBuilder.Entity("ProjectService.Models.RentACar.Service", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .IsRequired();

                    b.Property<int>("Price");

                    b.Property<int?>("RentACarCompanyId");

                    b.HasKey("Id");

                    b.HasIndex("RentACarCompanyId");

                    b.ToTable("Services");
                });

            modelBuilder.Entity("ProjectService.Models.RentACar.Vehicle", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Brand")
                        .IsRequired();

                    b.Property<int>("CubicCapacity");

                    b.Property<int>("HorsePower");

                    b.Property<int>("Kilometers");

                    b.Property<string>("Model")
                        .IsRequired();

                    b.Property<int>("NumberOfSeats");

                    b.Property<int>("Rating");

                    b.Property<int?>("RentACarCompanyId");

                    b.Property<bool>("Reserved");

                    b.Property<int>("Type");

                    b.Property<int>("YearOfProduction");

                    b.HasKey("Id");

                    b.HasIndex("RentACarCompanyId");

                    b.ToTable("Vehicles");
                });

            modelBuilder.Entity("ProjectService.Models.RentACar.Branch", b =>
                {
                    b.HasOne("ProjectService.Models.RentACar.RentACarCompany")
                        .WithMany("Branches")
                        .HasForeignKey("RentACarCompanyId");
                });

            modelBuilder.Entity("ProjectService.Models.RentACar.FreeDate", b =>
                {
                    b.HasOne("ProjectService.Models.RentACar.Vehicle")
                        .WithMany("FreeDates")
                        .HasForeignKey("VehicleId");
                });

            modelBuilder.Entity("ProjectService.Models.RentACar.Service", b =>
                {
                    b.HasOne("ProjectService.Models.RentACar.RentACarCompany")
                        .WithMany("Services")
                        .HasForeignKey("RentACarCompanyId");
                });

            modelBuilder.Entity("ProjectService.Models.RentACar.Vehicle", b =>
                {
                    b.HasOne("ProjectService.Models.RentACar.RentACarCompany")
                        .WithMany("Vehicles")
                        .HasForeignKey("RentACarCompanyId");
                });
#pragma warning restore 612, 618
        }
    }
}
