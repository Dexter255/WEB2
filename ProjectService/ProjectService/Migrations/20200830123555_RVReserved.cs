using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectService.Migrations
{
    public partial class RVReserved : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReservedTo",
                table: "Vehicles");

            migrationBuilder.AddColumn<int>(
                name: "Reserved",
                table: "Vehicles",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Reserved",
                table: "Vehicles");

            migrationBuilder.AddColumn<string>(
                name: "ReservedTo",
                table: "Vehicles",
                nullable: true);
        }
    }
}
