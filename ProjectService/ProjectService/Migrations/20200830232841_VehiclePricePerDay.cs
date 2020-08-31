using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectService.Migrations
{
    public partial class VehiclePricePerDay : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PricePerDay",
                table: "Vehicles",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PricePerDay",
                table: "Vehicles");
        }
    }
}
