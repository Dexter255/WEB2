using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectService.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RentACarCompanies",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CompanyName = table.Column<string>(nullable: false),
                    Address = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: false),
                    Rating = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RentACarCompanies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Branches",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Address = table.Column<string>(nullable: false),
                    RentACarCompanyId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Branches", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Branches_RentACarCompanies_RentACarCompanyId",
                        column: x => x.RentACarCompanyId,
                        principalTable: "RentACarCompanies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Services",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(nullable: false),
                    Price = table.Column<int>(nullable: false),
                    RentACarCompanyId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Services", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Services_RentACarCompanies_RentACarCompanyId",
                        column: x => x.RentACarCompanyId,
                        principalTable: "RentACarCompanies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Vehicles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Brand = table.Column<string>(nullable: false),
                    Model = table.Column<string>(nullable: false),
                    Type = table.Column<int>(nullable: false),
                    CubicCapacity = table.Column<int>(nullable: false),
                    HorsePower = table.Column<int>(nullable: false),
                    YearOfProduction = table.Column<int>(nullable: false),
                    Kilometers = table.Column<int>(nullable: false),
                    NumberOfSeats = table.Column<int>(nullable: false),
                    Rating = table.Column<int>(nullable: false),
                    BelongToCompanyId = table.Column<int>(nullable: false),
                    Reserved = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vehicles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Vehicles_RentACarCompanies_BelongToCompanyId",
                        column: x => x.BelongToCompanyId,
                        principalTable: "RentACarCompanies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Dates",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FreeDate = table.Column<DateTime>(nullable: false),
                    VehicleId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Dates_Vehicles_VehicleId",
                        column: x => x.VehicleId,
                        principalTable: "Vehicles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Branches_RentACarCompanyId",
                table: "Branches",
                column: "RentACarCompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Dates_VehicleId",
                table: "Dates",
                column: "VehicleId");

            migrationBuilder.CreateIndex(
                name: "IX_Services_RentACarCompanyId",
                table: "Services",
                column: "RentACarCompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_BelongToCompanyId",
                table: "Vehicles",
                column: "BelongToCompanyId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Branches");

            migrationBuilder.DropTable(
                name: "Dates");

            migrationBuilder.DropTable(
                name: "Services");

            migrationBuilder.DropTable(
                name: "Vehicles");

            migrationBuilder.DropTable(
                name: "RentACarCompanies");
        }
    }
}
