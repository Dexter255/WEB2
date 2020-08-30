using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectService.Migrations
{
    public partial class ReserveVehicle : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Reserved",
                table: "Vehicles");

            migrationBuilder.AddColumn<string>(
                name: "ReservedTo",
                table: "Vehicles",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ReservedVehicles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    VehicleId = table.Column<int>(nullable: false),
                    PickupDate = table.Column<DateTime>(nullable: false),
                    GetInCity = table.Column<string>(nullable: false),
                    ReturnDate = table.Column<DateTime>(nullable: false),
                    ReturnToCity = table.Column<string>(nullable: false),
                    ApplicationUserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReservedVehicles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReservedVehicles_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ReservedVehicles_ApplicationUserId",
                table: "ReservedVehicles",
                column: "ApplicationUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ReservedVehicles");

            migrationBuilder.DropColumn(
                name: "ReservedTo",
                table: "Vehicles");

            migrationBuilder.AddColumn<bool>(
                name: "Reserved",
                table: "Vehicles",
                nullable: false,
                defaultValue: false);
        }
    }
}
