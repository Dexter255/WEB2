using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectService.Migrations
{
    public partial class FIAcceptedEnum : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Accepted",
                table: "FlightInvitations");

            migrationBuilder.AddColumn<int>(
                name: "Option",
                table: "FlightInvitations",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Option",
                table: "FlightInvitations");

            migrationBuilder.AddColumn<bool>(
                name: "Accepted",
                table: "FlightInvitations",
                nullable: false,
                defaultValue: false);
        }
    }
}
