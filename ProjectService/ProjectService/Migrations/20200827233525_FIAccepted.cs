using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectService.Migrations
{
    public partial class FIAccepted : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InvitationAccepted",
                table: "Passengers");

            migrationBuilder.AddColumn<bool>(
                name: "Accepted",
                table: "FlightInvitations",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Accepted",
                table: "FlightInvitations");

            migrationBuilder.AddColumn<bool>(
                name: "InvitationAccepted",
                table: "Passengers",
                nullable: false,
                defaultValue: false);
        }
    }
}
