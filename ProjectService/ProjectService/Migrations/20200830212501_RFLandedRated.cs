using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectService.Migrations
{
    public partial class RFLandedRated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Landed",
                table: "ReservedFlights",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Rated",
                table: "ReservedFlights",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Landed",
                table: "ReservedFlights");

            migrationBuilder.DropColumn(
                name: "Rated",
                table: "ReservedFlights");
        }
    }
}
