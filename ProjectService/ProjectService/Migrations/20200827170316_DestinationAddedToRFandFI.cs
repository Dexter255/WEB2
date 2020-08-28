using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectService.Migrations
{
    public partial class DestinationAddedToRFandFI : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Destination",
                table: "ReservedFlights",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Destination",
                table: "FlightInvitations",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Destination",
                table: "ReservedFlights");

            migrationBuilder.DropColumn(
                name: "Destination",
                table: "FlightInvitations");
        }
    }
}
