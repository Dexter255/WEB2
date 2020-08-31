using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectService.Migrations
{
    public partial class VehicleRating : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RatedCount",
                table: "Vehicles",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "Rated",
                table: "ReservedVehicles",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "Rating",
                table: "ReservedVehicles",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "Returned",
                table: "ReservedVehicles",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "RatedCount",
                table: "RentACarCompanies",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RatedCount",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "Rated",
                table: "ReservedVehicles");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "ReservedVehicles");

            migrationBuilder.DropColumn(
                name: "Returned",
                table: "ReservedVehicles");

            migrationBuilder.DropColumn(
                name: "RatedCount",
                table: "RentACarCompanies");
        }
    }
}
