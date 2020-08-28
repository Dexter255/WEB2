﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ProjectService.Models;

namespace ProjectService.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20200827170316_DestinationAddedToRFandFI")]
    partial class DestinationAddedToRFandFI
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Discriminator")
                        .IsRequired();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");

                    b.HasDiscriminator<string>("Discriminator").HasValue("IdentityUser");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasMaxLength(128);

                    b.Property<string>("ProviderKey")
                        .HasMaxLength(128);

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider")
                        .HasMaxLength(128);

                    b.Property<string>("Name")
                        .HasMaxLength(128);

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("ProjectService.Models.Flight.Airline", b =>
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

                    b.ToTable("Airlines");
                });

            modelBuilder.Entity("ProjectService.Models.Flight.Destination", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("AirlineId");

                    b.Property<string>("City")
                        .IsRequired();

                    b.Property<int?>("FlightId");

                    b.HasKey("Id");

                    b.HasIndex("AirlineId");

                    b.HasIndex("FlightId");

                    b.ToTable("Destinations");
                });

            modelBuilder.Entity("ProjectService.Models.Flight.Flight", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("AirlineId");

                    b.Property<int>("Distance");

                    b.Property<DateTime>("EndDateAndTime");

                    b.Property<string>("EndDestination")
                        .IsRequired();

                    b.Property<string>("Hours")
                        .IsRequired();

                    b.Property<int>("Rating");

                    b.Property<DateTime>("StartDateAndTime");

                    b.Property<string>("StartDestination")
                        .IsRequired();

                    b.Property<int>("TicketPrice");

                    b.HasKey("Id");

                    b.HasIndex("AirlineId");

                    b.ToTable("Flights");
                });

            modelBuilder.Entity("ProjectService.Models.Flight.FlightInvitation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ApplicationUserId");

                    b.Property<string>("Destination");

                    b.Property<int>("FlightId");

                    b.Property<string>("InvitationFromUser");

                    b.HasKey("Id");

                    b.HasIndex("ApplicationUserId");

                    b.ToTable("FlightInvitations");
                });

            modelBuilder.Entity("ProjectService.Models.Flight.Luggage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("AirlineId");

                    b.Property<int>("Price");

                    b.Property<int>("Weight");

                    b.HasKey("Id");

                    b.HasIndex("AirlineId");

                    b.ToTable("Luggages");
                });

            modelBuilder.Entity("ProjectService.Models.Flight.Passenger", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("InvitationAccepted");

                    b.Property<int?>("ReservedFlightId");

                    b.Property<int>("RowId");

                    b.Property<int>("SeatId");

                    b.Property<string>("User_Fullname");

                    b.Property<string>("User_PassportNumber");

                    b.Property<string>("User_Username");

                    b.HasKey("Id");

                    b.HasIndex("ReservedFlightId");

                    b.ToTable("Passengers");
                });

            modelBuilder.Entity("ProjectService.Models.Flight.QuickReservationTicket", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("AirlineId");

                    b.Property<int>("Discount");

                    b.Property<string>("EndDestination")
                        .IsRequired();

                    b.Property<DateTime>("StartDateAndTime");

                    b.Property<string>("StartDestination")
                        .IsRequired();

                    b.Property<int>("TicketPrice");

                    b.HasKey("Id");

                    b.HasIndex("AirlineId");

                    b.ToTable("QuickReservationTickets");
                });

            modelBuilder.Entity("ProjectService.Models.Flight.ReservedFlight", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ApplicationUserId");

                    b.Property<string>("Destination");

                    b.Property<int>("FlightId");

                    b.HasKey("Id");

                    b.HasIndex("ApplicationUserId");

                    b.ToTable("ReservedFlights");
                });

            modelBuilder.Entity("ProjectService.Models.Flight.Row", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("FlightId");

                    b.HasKey("Id");

                    b.HasIndex("FlightId");

                    b.ToTable("Rows");
                });

            modelBuilder.Entity("ProjectService.Models.Flight.Seat", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("RowId");

                    b.Property<int>("Type");

                    b.Property<string>("User_Fullname");

                    b.Property<string>("User_PassportNumber");

                    b.Property<string>("User_Username");

                    b.HasKey("Id");

                    b.HasIndex("RowId");

                    b.ToTable("Seats");
                });

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

            modelBuilder.Entity("ProjectService.Models.Users.Friend", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .IsRequired();

                    b.Property<string>("ApplicationUserId");

                    b.Property<string>("ApplicationUserId1");

                    b.Property<string>("ApplicationUserId2");

                    b.Property<string>("Email")
                        .IsRequired();

                    b.Property<string>("Fullname")
                        .IsRequired();

                    b.Property<string>("Number")
                        .IsRequired();

                    b.Property<string>("Username")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("ApplicationUserId");

                    b.HasIndex("ApplicationUserId1");

                    b.HasIndex("ApplicationUserId2");

                    b.ToTable("Friends");
                });

            modelBuilder.Entity("ProjectService.Models.Users.ApplicationUser", b =>
                {
                    b.HasBaseType("Microsoft.AspNetCore.Identity.IdentityUser");

                    b.Property<string>("Address");

                    b.Property<string>("Fullname");

                    b.Property<string>("PassportNumber");

                    b.HasDiscriminator().HasValue("ApplicationUser");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("ProjectService.Models.Flight.Destination", b =>
                {
                    b.HasOne("ProjectService.Models.Flight.Airline")
                        .WithMany("Destinations")
                        .HasForeignKey("AirlineId");

                    b.HasOne("ProjectService.Models.Flight.Flight")
                        .WithMany("Locations")
                        .HasForeignKey("FlightId");
                });

            modelBuilder.Entity("ProjectService.Models.Flight.Flight", b =>
                {
                    b.HasOne("ProjectService.Models.Flight.Airline")
                        .WithMany("Flights")
                        .HasForeignKey("AirlineId");
                });

            modelBuilder.Entity("ProjectService.Models.Flight.FlightInvitation", b =>
                {
                    b.HasOne("ProjectService.Models.Users.ApplicationUser")
                        .WithMany("FlightInvitations")
                        .HasForeignKey("ApplicationUserId");
                });

            modelBuilder.Entity("ProjectService.Models.Flight.Luggage", b =>
                {
                    b.HasOne("ProjectService.Models.Flight.Airline")
                        .WithMany("LuggageInfo")
                        .HasForeignKey("AirlineId");
                });

            modelBuilder.Entity("ProjectService.Models.Flight.Passenger", b =>
                {
                    b.HasOne("ProjectService.Models.Flight.ReservedFlight")
                        .WithMany("Passengers")
                        .HasForeignKey("ReservedFlightId");
                });

            modelBuilder.Entity("ProjectService.Models.Flight.QuickReservationTicket", b =>
                {
                    b.HasOne("ProjectService.Models.Flight.Airline")
                        .WithMany("QuickReservationTickets")
                        .HasForeignKey("AirlineId");
                });

            modelBuilder.Entity("ProjectService.Models.Flight.ReservedFlight", b =>
                {
                    b.HasOne("ProjectService.Models.Users.ApplicationUser")
                        .WithMany("ReservedFlights")
                        .HasForeignKey("ApplicationUserId");
                });

            modelBuilder.Entity("ProjectService.Models.Flight.Row", b =>
                {
                    b.HasOne("ProjectService.Models.Flight.Flight")
                        .WithMany("Rows")
                        .HasForeignKey("FlightId");
                });

            modelBuilder.Entity("ProjectService.Models.Flight.Seat", b =>
                {
                    b.HasOne("ProjectService.Models.Flight.Row")
                        .WithMany("Seats")
                        .HasForeignKey("RowId");
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

            modelBuilder.Entity("ProjectService.Models.Users.Friend", b =>
                {
                    b.HasOne("ProjectService.Models.Users.ApplicationUser")
                        .WithMany("FriendRequests")
                        .HasForeignKey("ApplicationUserId");

                    b.HasOne("ProjectService.Models.Users.ApplicationUser")
                        .WithMany("FriendRequestsSent")
                        .HasForeignKey("ApplicationUserId1");

                    b.HasOne("ProjectService.Models.Users.ApplicationUser")
                        .WithMany("Friends")
                        .HasForeignKey("ApplicationUserId2");
                });
#pragma warning restore 612, 618
        }
    }
}
